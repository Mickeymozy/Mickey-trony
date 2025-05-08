const linkRegex = /(?:chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})|https:\/\/whatsapp\.com\/channel\/[0-9A-Za-z]+)/i;

export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true; // Ignore bot's own messages
  if (!m.isGroup) return false; // Only process group chats

  // Ensure chat data exists in the database
  let chat = global.db.data.chats[m.chat] || {};
  global.db.data.chats[m.chat] = chat;

  // Check if message contains a group link and antiLink is enabled
  const isGroupLink = linkRegex.exec(m.text);
  if (chat.antiLink && isGroupLink && !isAdmin) {
    console.log(`Link detected from non-admin: ${m.sender}`);

    // Check if the bot is admin to take action
    if (isBotAdmin) {
      try {
        const linkThisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`;
        if (m.text.includes(linkThisGroup)) return true; // Ignore links to the same group

       const linkThisGroup = `https://youtu.be/${await conn.groupInviteCode(m.chat)}`;
        if (m.text.includes(linkThisGroup)) return true; // Ignore links to the same group

        // Notify the user and remove them
        await conn.reply(
          m.chat,
          `*🚨 Link Detected*\n\nGroup links from other groups are not allowed.\n\nSorry, *@${m.sender.split('@')[0]}*, but you will now be removed from the group.`,
          null,
          { mentions: [m.sender] }
        );

        // Delete the message containing the link
        await conn.sendMessage(m.chat, { delete: m.key });

        // Remove the user from the group
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      } catch (err) {
        console.error(`Error while handling anti-link: ${err}`);
      }
    } else {
      console.log("Bot is not an admin and cannot remove members.");
    }
  }
  return true;
}
