let linkRegex = /\b((https?:\/\/|www\.)?[\w-]+\.[\w-]+(?:\.[\w-]+)*(\/[\w\.\-\/]*)?)\b/i;
export async function before(m, { isAdmin, isBotAdmin, text }) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) return !1;
  const chat = global.db.data.chats[m.chat];
  const delet = m.key.participant;
  const bang = m.key.id;
  const bot = global.db.data.settings[this.user.jid] || {};
  const user = `@${m.sender.split`@`[0]}`;
  const isGroupLink = linkRegex.exec(m.text);

  if (chat.antiLink2 && isGroupLink && !isAdmin) {
    if (isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
      const linkThisGroup2 = `https://www.youtube.com/`;
      const linkThisGroup3 = `https://youtu.be/`;
      if (m.text.includes(linkThisGroup)) return !0;
      if (m.text.includes(linkThisGroup2)) return !0;
      if (m.text.includes(linkThisGroup3)) return !0;
    }

    await this.sendMessage(
      m.chat,
      {
        text: `*「 ANTI LINKS 」*\nYou should learn 🙄 ${user} As per the group rules, you will be expelled...!!`,
        mentions: [m.sender],
      },
      { quoted: m }
    );

    if (!isBotAdmin) {
      return m.reply('[🚫] I am not an admin! Therefore, I cannot execute the expulsion action.');
    }

    if (isBotAdmin && bot.restrict) {
      await conn.sendMessage(m.chat, {
        delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet },
      });

      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    } else if (!bot.restrict) {
      // Suggest a fix if the restriction option is not enabled
      return m.reply(
        '*[🚫] The Owner has not activated the restriction option. Please ask the owner to enable the restriction option in the bot settings to allow this action.*'
      );
    }
  }
  return !0;
}
