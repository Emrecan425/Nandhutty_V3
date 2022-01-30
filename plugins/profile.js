let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
let handler = async (m, { conn, usedPrefix }) => {
  let pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    if (typeof global.db.data.users[who] == "undefined") {
      global.db.data.users[who] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
        registered: false,
        name: conn.getName(m.sender),
        age: -1,
        regTime: -1,
        afk: -1,
        afkReason: '',
        banned: false,
        level: 0,
        call: 0,
        role: 'Warrior V',
        autolevelup: false,
        pc: 0,
      }
    }
    let { name, limit, exp, lastclaim, registered, regTime, age, level, role, banned } = global.db.data.users[who]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    let math = max - xp
    let str = `
*Name* : ${username} ${registered ? '(' + name + ') ' : ''}(@${who.replace(/@.+/, '')})${about != 401 ? '\nInfo: ' + about : ''}
*Number* : ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
*Link* : https://wa.me/${who.split`@`[0]}${registered ? '\nUmur: ' + age : ''}
*XP* : TOTAL ${exp} (${exp - min} / ${xp}) [${math <= 0 ? `Ready for *${usedPrefix}levelup*` : `${math} Need more XP for levelup`}]
*Level* : ${level}
*Role* : *${role}*
*Limit* : ${limit}
*Premium* : ${prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) ? 'Ya' : 'No'}
*Registered* : ${registered ? 'Ya (' + new Date(regTime).toLocaleString() + ')' : 'No'}${lastclaim > 0 ? '\nTerakhir Klaim: ' + new Date(lastclaim).toLocaleString() : ''}
`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'pp.jpg', banned ? 'jiakh ke banned' : str, m, false, { contextInfo: { mentionedJid } })
  }
}
handler.help = ['alive']
handler.tags = ['main']
handler.command = /^alive?$/i
module.exports = handler
