module.exports = {
    name: 'bot_reply',
    async handle(sock, jid, msg, text, config) {
        const input = text.toLowerCase();
        
        if (input === 'bot') {
            await sock.sendMessage(jid, { text: "জ্বী বস! আমি অনলাইনে আছি। কোনো সাহায্য লাগবে? 😎" });
        } else if (input === 'tom' || input === 'টম') {
            await sock.sendMessage(jid, { text: "টম ভাই তো এখন ব্যস্ত! আমি উনার পার্সোনাল অ্যাসিস্ট্যান্ট, আপনাকে কি সাহায্য করতে পারি? ✨" });
        }
    }
};
