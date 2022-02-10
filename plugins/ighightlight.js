let fetch = require('node-fetch')
let handler = async(m, { conn, args, command, usedPrefix }) => {
  if (!args[0]) throw `uhm.. what is the username?\n\nexample:\n${usedPrefix + command} wizard.mp4`
  let res = await fetch(global.API('xteam', '/dl/ighighlight', {
    name: args[0]
  }, 'APIKEY'))
  if (!res.ok) throws error
  let json = await res.json()
  if (json.result.error) throw json.result.message
  let { username, items } = json.result
  for (let { thumbnail, isVideo, url } of items) {
    thumbnail = await(await fetch(thumbnail)).buffer()
    conn.sendFile(m.chat, url, 'ig' + (isVideo ? '.mp4' : '.jpg'), '', m, 0, {
      thumbnail
    })
  }
}
handler.help = ['ighighlight'].map(v => v + ' <username>')
handler.tags = ['downloader']

handler.command = /^(ighighlight?)$/i

module.exports = handler
