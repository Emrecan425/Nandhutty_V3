let handler = async (m, { conn, args }) => {
  let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
  if (!m.mentionedJid[0]) throw `ᴛᴀɢ ᴜ ᴡᴀɴᴛ ᴛᴏ ᴋɪᴄᴋ`
  let users = m.mentionedJid.filter(u => !(u == ownerGroup || u.includes(conn.user.jid)))
  for (let user of users) if (user.endsWith('@s.whatsapp.net')) await conn.groupRemove(m.chat, [user])
}
handler.help = ['kick', '-'].map(v => 'o' + v + ' @user')
handler.tags = ['owner']
handler.command = /^kick/i

handler.admin = true
handler.group = true
handler.botAdmin = true

module.exports = handler
