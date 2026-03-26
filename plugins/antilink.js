module.exports = {
    name: 'antilink',
    async handle(sock, jid, msg, text, config) {
        if (jid.endsWith('@g.us') && (text.includes('http://') || text.includes('https://') || text.includes('www.'))) {
            const sender = msg.key.participant || msg.key.remoteJid;
            const senderNumber = sender.split('@')[0];
            
            // অ্যাডমিন চেক (অ্যাডমিনদের জন্য ছাড়)
            const isAdmin = config.admin.includes(senderNumber) || senderNumber === config.ownerNumber;

            if (!isAdmin) {
                // লিঙ্ক ডিলিট করা
                await sock.sendMessage(jid, { delete: msg.key });
                
                // ওয়ার্নিং মেসেজ
                let warning = `╭═══〘 ⚠️ *ANTILINK* ⚠️ 〙═══⊷❍\n` +
                             `┃ 👮 *Action:* Message Deleted\n` +
                             `┃ 👤 *User:* @${senderNumber}\n` +
                             `┃ 🚫 *Reason:* লিঙ্ক শেয়ার করা নিষেধ!\n` +
                             `╰══════════════════════⊷❍`;
                await sock.sendMessage(jid, { text: warning, mentions: [sender] });
            }
        }
    }
};
