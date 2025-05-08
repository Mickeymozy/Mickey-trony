import { performance } from 'perf_hooks'
import moment from 'moment-timezone'
import { promisify } from 'util'

let handler = async (m, { conn, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  let name = conn.getName(m.sender)
  let date = moment.tz('Africa/Nairobi').format('dddd, MMMM Do YYYY')
  let time = moment.tz('Africa/Nairobi').format('hh:mm A')
  let uptime = process.uptime() * 1000
  let muptime = await promisify(setTimeout)(0).then(() => process.uptime() * 1000)
  let _muptime = muptime

  let mode = global.opts['self'] ? 'Self' : 'Public'
  let ping = performance.now()

  let pp = './media/shizo.jpg'  // Ensure this is a valid image path.
  let more = String.fromCharCode(8206)
  let readMore = more.repeat(900)

  let menu = `
╭━━━[ 👋 𝗛𝗲𝗹𝗹𝗼, *${name}* ]
┃📅 Date: *${date}*
┃⏰ Time: *${time}*
┃📡 Ping: *${(performance.now() - ping).toFixed(2)} ms*
┃🕐 Uptime: *${clockString(uptime)}*
┃🧠 Runtime: *${clockString(_muptime)}*
┃🚦 Mode: *${mode}*
╰━━━━━━━━━━━━━━━━━━

✨ *Interactive Features* ✨
╭━━━━━━━━━━━━━━━━━━
┃🌟 **Main Menu**  
┃   🤖 botmenu  
┃   👑 ownermenu  
┃   👥 groupmenu  
┃   📦 dlmenu  
┃   🎮 gamemenu  
┃   💰 economymenu  
┃   🎭 funmenu  
┃   🎨 stickermenu  
┃   🧰 toolmenu  
┃   🖌️ logomenu  
┃   🔞 nsfwmenu  
╰━━━━━━━━━━━━━━━━━━

🎉 *Bot Features*  
╭━━━━━━━━━━━━━━━━━━
┃   📡 gita  
┃   📶 ping  
┃   ⏱️ uptime  
┃   🤖 bot  
┃   👤 owner  
┃   📜 script  
┃   🧭 runtime  
┃   📍 infobot  
┃   ❤️ pair  
┃   🌍 groups  
┃   🚫 blocklist  
┃   🌟 listprem  
╰━━━━━━━━━━━━━━━━━━

👑 *Owner Controls*  
╭━━━━━━━━━━━━━━━━━━
┃   🚫 banchat  
┃   🛑 unbanchat  
┃   🛠️ getjid  
┃   🚪 unbanuser  
┃   📢 broadcast  
┃   🔗 join link  
┃   🖼️ getpp  
┃   🔠 setprefix  
┃   📁 getfile  
╰━━━━━━━━━━━━━━━━━━

👥 *Group Controls*  
╭━━━━━━━━━━━━━━━━━━
┃   🚷 kick  
┃   👑 promote  
┃   📉 add  
┃   📋 infogroup  
┃   🔗 link  
┃   🖼️ setpp  
┃   📝 setname  
┃   📣 setwelcome  
┃   📢 setbye  
┃   ⚠️ warn  
┃   🚨 unwarn  
┃   🔐 group open  
┃   🔒 group close  
┃   🚨 hidetag  
╰━━━━━━━━━━━━━━━━━━

📥 *Download Options*  
╭━━━━━━━━━━━━━━━━━━
┃   🎧 play  
┃   📹 song  
┃   🎵 yta  
┃   🖼️ image  
┃   📌 yts 
┃   📁 mediafire  
┃   ☁️ gdrive  
┃   🐱‍🏍 gitclone  
┃   🎥 tiktok  
┃   📘 facebook  
┃   🐦 twitter  
┃   🎶 spotify  
╰━━━━━━━━━━━━━━━━━━


🎭 *Fun & Games*  
╭━━━━━━━━━━━━━━━━━━
┃   💬 getsticker  
┃   💘 love  
┃   ❤️ ship  
┃   😂 stupid  
┃   🃏 ytcomment  
┃   🎴 simpcard  
┃   🍑 hornycard  
╰━━━━━━━━━━━━━━━━━━

🧰 *Utility Tools*  
╭━━━━━━━━━━━━━━━━━━
┃   📦 readmore  
┃   📧 tovid  
┃   🔗  tourl  
┃   🔎 whois ip/domain  
╰━━━━━━━━━━━━━━━━━━

━

🌐 * - Innovation that Connects *  
🦄 *MICKEY | EST. 2025*  

${readMore}
`

  conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: menu,
    contextInfo: {
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363314875614529@newsletter',
        newsletterName: 'Mickey',
        serverMessageId: 143
      }
    }
  }, { quoted: m })
}

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

handler.help = ['main']
handler.tags = ['main']
handler.command = ['main']

export default handler
