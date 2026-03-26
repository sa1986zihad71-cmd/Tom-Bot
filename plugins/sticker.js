module.exports = {
    name: 'sticker_maker',
    command: ['s', 'sticker'],
    async execute(sock, jid, msg, text, config) {
        const type = Object.keys(msg.message)[0];
        if (type !== 'imageMessage') return sock.sendMessage(jid, { text: '📸 একটি ছবিতে রিপ্লাই দিয়ে !s লিখুন!' });

        await sock.sendMessage(jid, { text: '⏳ স্টিকার বানানো হচ্ছে...' });
        
        // এখানে স্টিকার কনভার্ট করার ফাংশন থাকবে
        await sock.sendMessage(jid, { sticker: { url: msg.message.imageMessage.url } });
    }
};
