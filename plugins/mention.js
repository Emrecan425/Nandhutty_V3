let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `example:\n${usedPrefix + command} @6285157336614`
    m.reply(text, false, {
      contextInfo: {
        mentionedJid: conn.parseMention(text)
      }
    })
  }
  handler.help = ['mention <text>']
  handler.tags = ['tools']
  
  handler.command = /^mention$/i
  
  module.exports = handler
  
