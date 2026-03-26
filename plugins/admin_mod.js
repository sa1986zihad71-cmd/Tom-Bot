module.exports = {
    name: 'admin_mod',
    command: ['promote', 'demote'],
    async execute(sock, jid, msg, text, config) {
        const mention = msg.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
        if (mention.length === 0) return sock.sendMessage(jid, { text: '⚠️ কাউকে মেনশন দিন!' });

        if (text.includes('promote')) {
            await sock.groupParticipantsUpdate(jid, mention, "promote");
            await sock.sendMessage(jid, { text: `✅ @${mention[0].split('@')[0]} এখন অ্যাডমিন!`, mentions: mention });
        } else {
            await sock.groupParticipantsUpdate(jid, mention, "demote");
            await sock.sendMessage(jid, { text: `👞 @${mention[0].split('@')[0]} কে পদচ্যুত করা হলো।`, mentions: mention });
        }
    }
};
