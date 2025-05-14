let handler = async (m, { conn }) => {
    let vcard = `
  BEGIN:VCARD
VERSION:3.0
N:;MICKEY;;;
FN:MICKEY
ORG:MICKEY
TITLE:
TEL;TYPE=CELL;VALUE=uri:tel:+255615944741
X-ABLabel:MICKEY
X-WA-BIZ-DESCRIPTION:
X-WA-BIZ-NAME:MICKEY
END:VCARD
    `.trim();
  
    await conn.sendMessage(
      m.chat,
      {
        contacts: {
          displayName: "MICKEY_45",
          contacts: [{ vcard }],
        },
      },
      { quoted: m }
    );
  };
  
  handler.help = ["owner"];
  handler.tags = ["main"];
  handler.command = ["owner", "creator",];
  
  export default handler;
  
