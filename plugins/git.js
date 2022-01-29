let fetch = require ('node-fetch')
let handler = async (m, { conn }) => {
    let haruno = `┌ 「 𝐆𝐈𝐓」
    sᴏʀʀʏ ʙʀᴏ ᴡᴇ ʜᴀᴠᴇɴ'ᴛ ʀᴇʟᴇᴀsᴇᴅ ᴛʜɪs ʙᴏᴛ 🙂
`.trim()
    await conn.send2ButtonLoc(m.chat, await (await fetch("https://telegra.ph/file/bf3338fe831a6ea2dfbdc.jpg")).buffer(), haruno, 'watermark', 'ᴍᴇɴᴜ', '.menu', 'ᴏᴡɴᴇʀ', '.owner', m)
}
handler.tags = ['main']
handler.help = ['git']
handler.command = /^(git)$/i
module.exports = handler
