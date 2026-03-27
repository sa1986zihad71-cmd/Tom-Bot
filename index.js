const { default: makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, Browsers, DisconnectReason } = require("@whiskeysockets/baileys");
const pino = require('pino');
const fs = require('fs-extra');
const path = require('path');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
        },
        printQRInTerminal: false,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });

    // --- Pairing Code Logic ---
    if (!sock.authState.creds.registered) {
        let num = "8801714821271"; 
        
        setTimeout(async () => {
            try {
                let code = await sock.requestPairingCode(num);
                console.log(`\n\n🔹 আপনার পেয়ারিং কোড: ${code}\n\n`);
            } catch (err) {
                console.log("কোড রিকোয়েস্ট ফেইলড: ", err.message);
            }
        }, 10000); // ১০ সেকেন্ড সময় দিন যাতে সেশন ফাইল তৈরি হওয়ার সময় পায়
    }

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed, reconnecting...', shouldReconnect);
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.log('🛡️ Bot is online and connected!');
        }
    });

    console.log(`🛡️ Bot Engine Started! Wait for code...`);
}

startBot().catch(err => console.log("Critical Error: ", err));
