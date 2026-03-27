const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason, 
    makeCacheableSignalKeyStore, 
    Browsers 
} = require("@whiskeysockets/baileys");
const pino = require('pino');
const path = require('path');
const http = require('http');

// সার্ভার সচল রাখার জন্য
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bot is Alive\n');
}).listen(process.env.PORT || 8080);

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, 'session'));

    const sock = makeWASocket({
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
        },
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        browser: Browsers.macOS("Desktop"),
        syncFullHistory: false,
        markOnlineOnConnect: true,
    });

    // --- পেয়ারিং কোড সেকশন ---
    if (!sock.authState.creds.registered) {
        let phoneNumber = "8801714821271"; 
        
        setTimeout(async () => {
            try {
                let code = await sock.requestPairingCode(phoneNumber);
                console.log("\n\n==============================");
                console.log("🚀 YOUR CODE:", code);
                console.log("==============================\n\n");
            } catch (err) {
                console.log("কোড রিকোয়েস্ট ফেইলড: ", err.message);
            }
        }, 8000); 
    }

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            console.log(`কানেকশন বন্ধ (Reason: ${reason}), রিস্টার্ট হচ্ছে...`);
            connectToWhatsApp();
        } else if (connection === 'open') {
            console.log('✅ সফলভাবে কানেক্ট হয়েছে!');
        }
    });
}

connectToWhatsApp().catch(err => console.log("Error: " + err));
