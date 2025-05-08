import { performance } from 'perf_hooks';
import moment from 'moment-timezone';

let handler = async (m, { conn }) => {
  try {
    let user = global.db?.data?.users?.[m.sender];
    let name = conn.getName(m.sender);
    let date = moment.tz('Africa/Nairobi').format('dddd, MMMM Do YYYY');
    let time = moment.tz('Africa/Nairobi').format('hh:mm A');
    let uptime = process.uptime() * 1000;

    let mode = global.opts?.self ? 'Self' : 'Public';
    let ping = performance.now();
    
    let pp = './media/shizo.jpg'; // Ensure this file exists!
    let menu = `
    ╭━━━[ 👋 Hello, *${name}* ]
    ┃📅 Date: *${date}*
    ┃⏰ Time: *${time}*
    ┃📡 Ping: *${(performance.now() - ping).toFixed(2)} ms*
    ┃🕐 Uptime: *${clockString(uptime)}*
    ┃🚦 Mode: *${mode}*
    ╰━━━━━━━━━━━━━━━━━━
    `;

    await conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: menu,
      contextInfo: { mentionedJid: [m.sender] },
    }, { quoted: m });
  } catch (error) {
    console.error('Error in handler:', error);
  }
};

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

handler.help = ['main'];
handler.tags = ['main'];
handler.command = ['main'];

export default handler;
