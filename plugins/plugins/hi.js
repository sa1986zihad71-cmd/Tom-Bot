module.exports = {
    name: 'hi',
    command: ['hi', 'hello'],
    async execute(sock, jid, msg, text, config) {
        await sock.sendMessage(jid, { text: `হ্যালো টম ভাই! আপনার বট একদম রেডি।` });
    }
};
