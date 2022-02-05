let fetch = require('node-fetch')

let handler = async(m, { conn, text, participants, usedPrefix, command }) => {
  if (m.quoted) {
    await conn.groupAdd(m.chat, [m.quoted.sender]).catch(_ => _)
  }
  if (!text) throw `uhm.. what is the number?\n\nexample:\n\n${usedPrefix + command + ' ' + global.owner[0]}`
  let _participants = participants.map(user => user.jid)
  let users = (await Promise.all(
    text.split(',')
      .map(v => v.replace(/[^0-9]/g, ''))
      .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
      .map(async v => [
        v,
        await conn.isOnWhatsApp(v + '@s.whatsapp.net')
      ])
  )).filter(v => v[1]).map(v => v[0] + '@c.us')
  let response = await conn.groupAdd(m.chat, users)
  if (response[users] == 408) throw `_Failed!_\n\nThe number has been logged out recently\nOnly login via *${usedPrefix}link* group`
  let pp = await conn.getProfilePicture(m.chat).catch(_ => false)
  let jpegThumbnail = pp ? await(await fetch(pp)).buffer() : false
  for (let user of response.participants.filter(user => Object.values(user)[0].code == 403)) {
    let [[jid, {
      invite_code,
      invite_code_exp
    }]] = Object.entries(user)
    let text = `Invite @${jid.split`@`[0]} using invite...`
    m.reply(text, null, {
      contextInfo: {
        mentionedJid: conn.parseMention(text)
      }
    })
    await conn.sendGroupV4Invite(m.chat, jid, invite_code, invite_code_exp, false, 'Invitation to join my WhatsApp group', jpegThumbnail ? {
      jpegThumbnail
    } : { })
  }
}
handler.help = ['add', '+'].map(v => v + 'number,number')
handler.tags = ['admin']
handler.command = /^(add|\+)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true
handler.limit = true

module.exports = handler
