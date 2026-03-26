module.exports = {
    name: 'main_menu',
    command: ['menu', 'help', 'list'],
    async execute(sock, jid, msg, text, config) {
        const time = new Date().toLocaleTimeString();
        const date = new Date().toLocaleDateString();

        const fullMenu = `╭═══〘 🛡️ *${config.botName}* 🛡️ 〙═══⊷❍
┃ 👤 *Owner:* ${config.botOwner}
┃ ⚡ *Prefix:* ${config.PREFIX}
┃ 📅 *Date:* ${date}
┃ ⏰ *Time:* ${time}
╰══════════════════════⊷❍

┏━━━〘 🛠️ *ADMIN POWER* 〙━━━⊷
┃ ◈ ${config.PREFIX}tagall (Sobai-ke mention)
┃ ◈ ${config.PREFIX}kick (Mention diye kick)
┃ ◈ ${config.PREFIX}kickall (Puro group faka)
┃ ◈ ${config.PREFIX}promote (Admin banano)
┃ ◈ ${config.PREFIX}demote (Admin shorano)
┃ ◈ ${config.PREFIX}mute (Group bondho)
┃ ◈ ${config.PREFIX}unmute (Group khola)
┗━━━━━━━━━━━━━━━━━━━━⊷❍

┏━━━〘 🚫 *SECURITY* 〙━━━⊷
┃ ◈ ${config.PREFIX}antispam on/off
┃ ◈ ${config.PREFIX}antilink (Auto delete)
┗━━━━━━━━━━━━━━━━━━━━⊷❍

┏━━━〘 🎵 *DOWNLOADER* 〙━━━⊷
┃ ◈ ${config.PREFIX}song [Ganer Nam]
┃ ◈ ${config.PREFIX}video [Link]
┃ ◈ ${config.PREFIX}s [Photo-te reply] (Sticker)
┗━━━━━━━━━━━━━━━━━━━━⊷❍

┏━━━〘 🤖 *BOT INFO* 〙━━━⊷
┃ ◈ ${config.PREFIX}alive (Bot check)
┃ ◈ ${config.PREFIX}owner (Owner info)
┗━━━━━━━━━━━━━━━━━━━━⊷❍

╭══════════════════════⊷❍
┃ 💻 *Powered by Tom Bhai Bot* 🚀
╰══════════════════════⊷❍`;

        await sock.sendMessage(jid, { 
            image: { url: config.helpPic }, 
            caption: fullMenu 
        });
    }
};
