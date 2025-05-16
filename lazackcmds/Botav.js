let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  let name = conn.getName(m.sender)
  let taguser = '@' + m.sender.split('@s.whatsapp.net')[0]
  let av = `./Botify/${pickRandom(['Mickey2', 'Mickey'])}.mp3`


conn.sendButton(m.chat, `*HELLO IM HERE*      
    FOR YOU @${m.sender.split('@')[0]} 
    TELL ME WHATEVER I LISTEN ? 🙏
  `.trim(), igfg, null, , m, { mentions: [m.sender] })
  
conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true })
} 

handler.customPrefix = /^(trony/i
handler.command = new RegExp()

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
