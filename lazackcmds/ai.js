import fetch from 'node-fetch'

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Please provide some text or quote a message to get a response.`
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text
  }

  try {
    const rwait = '⏳'; // Add the waiting reaction
    const done = '✅'; // Add the done reaction
    
    m.react(rwait)
    
    conn.sendPresenceUpdate('composing', m.chat)
    const prompt = encodeURIComponent(text)

    const guru1 = `https://chatgptforprabath-md.vercel.app/api/gptv1?q=${prompt}`

    try {
      let response = await fetch(guru1)
      let data = await response.json()
      let result = data.response.response

      if (!result) {
        throw new Error('No valid JSON response from the first API')
      }
      m.react(done)
    } catch (error) {
      console.error('Error from the first API:', error)

      const guru2 = `https://ultimetron.guruapi.tech/gpt3?prompt=${prompt}`

      let response = await fetch(guru2)
      let data = await response.json()
      let result = data.completion

      m.react(done)
    }
  } catch (error) {
    console.error('Error:', error)
    throw `*ERROR*`
  }
}
handler.help = ['chatgpt']
handler.tags = ['AI']
handler.command = ['bro', 'chatgpt', 'ai', 'gpt']

export default handler
