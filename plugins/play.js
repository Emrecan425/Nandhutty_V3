const { servers, yta, ytv } = require('../lib/y2mate')
let yts = require('yt-search')
let fs = require('fs')
let fetch = require('node-fetch')
const reply = {
key: {
			participant: '@s.whatsapp.net'
		},
		message: {
			"productMessage": {
				"product": {
					"productImage":{
						"mimetype": "image/jpg",
						"jpgThumbnail":  fs.readFileSync('./icon.jpg') ////Gambarny
					},
					"title": `Nandhutty`, //Kasih namalu 
					"description": `%name`, 
					"currencyCode": "INR",
					"priceAmount1000": "999999999",
					"retailerId": ` %name`,
					"productImageCount": 1
				},
				    "businessOwnerJid": `0@s.whatsapp.net`
		}
	}
}
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `uhm.. what are you looking for?\n\nexample:\n${usedPrefix + command} PaniPalli`
  let chat = global.db.data.chats[m.chat]
  let results = await yts(text)
  let vid = results.all.find(video => video.seconds < 3600)
  if (!vid) throw 'Content Not found'
  let isVideo = /2$/.test(command)
  let yt = false
  let yt2 = false
  let usedServer = servers[0]
  for (let i in servers) {
    let server = servers[i]
    try {
      yt = await yta(vid.url, server)
      yt2 = await ytv(vid.url, server)
      usedServer = server
      break
    } catch (e) {
      m.reply(`Server ${server} error!${servers.length >= i + 1 ? '' : '\ntry again...'}`)
    }
  }
  let { dl_link, thumb, title, filesize, filesizeF } = yt
  await conn.send3ButtonImg(m.chat, await (await fetch(thumb)).buffer(), `*Title:* ${title}
*Audio File Size:* ${filesizeF}
*Video File Size:* ${yt2.filesizeF}`, watermark, `🎵 ᴍᴘ3 ${filesizeF}`, `.yta ${vid.url}`, `🎥 ᴍᴘ4 ${yt2.filesizeF}`, `.ytv ${vid.url}`, `▶️Source Url`, '.sc', reply)
}
handler.help = ['song','play','?'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(play|song)$/i

handler.exp = 0

module.exports = handler
