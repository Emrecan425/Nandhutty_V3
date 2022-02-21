let fetch = require ('node-fetch')
let handler = async (m, { conn }) => {
    let haruno = `┌ 「 𝐆𝐈𝐓」
    sᴏʀʀʏ ʙʀᴏ ᴡᴇ ʜᴀᴠᴇɴ'ᴛ ʀᴇʟᴇᴀsᴇᴅ ᴛʜɪs ʙᴏᴛ 🙂
`.trim()
    await conn.send2ButtonLoc(m.chat, await (await fetch("https://raw.githubusercontent.com/Arjun-ser-ofc/Arjunser/main/Millie/20220204_171905.jpg")).buffer(), haruno, 'watermark', 'ᴍᴇɴᴜ', '.menu', 'ᴏᴡɴᴇʀ', '.owner', m)
}
handler.tags = ['main']
handler.help = ['git']
handler.command = /^(git)$/i
module.exports = handler
