const { default: makeWASocket, useMultiFileAuthState, Browsers, delay } = require("@whiskeysockets/baileys");
const pino = require('pino');
const fs = require('fs-extra');
const http = require('http');

// সার্ভার পোর্ট ঠিক রাখা
http.createServer((req, res) => {
    res.end("Tom-Bot is Live");
}).listen(process.env.PORT || 8080);

async function startBot() {
    // সেশন ফোল্ডার যদি থাকে তবে সেটা ফ্রেশ করে নেওয়া
    const { state, saveCreds } = await useMultiFileAuthState('./session');

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        auth: state,
        // এখানে আমরা ব্রাউজারের নাম বদলে দিচ্ছি যাতে হোয়াটসঅ্যাপ ধরতে না পারে
        browser: ["Ubuntu", "Chrome", "110.0.5481.177"] 
    });

    if (!sock.authState.creds.registered) {
        let num = "8801714821271"; 
        
        // সময়টা বাড়িয়ে ১৫ সেকেন্ড করলাম যেন সেশন ফাইলগুলো ঠিকমতো লোড হয়
        console.log("⏳ Waiting 15 seconds for WhatsApp server to stabilize...");
        await delay(15000); 

        try {
            let code = await sock.requestPairingCode(num);
            console.log(`\n\n🔹 YOUR PAIRING CODE: ${code}\n\n`);
        } catch (err) {
            console.log("❌ Pairing Error: ", err.message);
        }
    }

    sock.ev.on('creds.update', saveCreds);
    console.log("🛡️ Bot Engine Started! Please wait...");
}

startBot();
