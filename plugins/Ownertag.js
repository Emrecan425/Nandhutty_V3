let fetch = require ('node-fetch')
let fs = require('fs')
let vn =['./Devil/mention.mp3']
hasil = vn[Math.floor(Math.random() * (vn.length))]
hisil = fs.readFileSync(hasil)
let handler = async (m, { conn, text }) => {
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]
const anu = {
key: {
			participant: `0@s.whatsapp.net`,
      remoteJid: 'status@broadcast'
		},
		message: {
			"productMessage": {
				"product": {
					"productImage":{
						"mimetype": "image/jpeg",
						"jpegThumbnail":  fs.readFileSync('./src/icon.jpg')
					},
					"title": `ī.am/ꪶᴀᴊᴍᴀʟꫂ⁩⁩`,
					"description": `%name`, 
					"currencyCode": "INR",
					"priceAmount1000": "9999",
					"retailerId": ` %name`,
					"productImageCount": 1
				},
				    "businessOwnerJid": `0@s.whatsapp.net`
		}
	}
}
  conn.sendMessage(m.chat, hisil, 'audioMessage', {mimetype: 'audio/mp4', quoted: anu, ptt: true, duration: 39999600, contextInfo: {externalAdReply: {title: 'ᴏᴏʜ ʙᴡᴏɪ ᴍʏ ᴏᴡɴᴇʀ ɪꜱ ', body: `ʙᴜꜱʏ ɴᴏᴡ`, sourceUrl: 'https://a-j-m-a-l.github.io/', thumbnail: fs.readFileSync('./src/icon.jpg')}}})
    let mentionedJid = [m.sender]
}
handler.customPrefix = /@919744196187/i
handler.command = new RegExp
handler.owner = false
handler.mods = false
handler.premium = false

handler.admin = false
handler.botAdmin = false
module.exports = handler
