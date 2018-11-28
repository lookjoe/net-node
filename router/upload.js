const fs = require('fs')
const path = require('path')

var fn_upload = async (ctx, next) => {
    const filePaths = []
    const files = ctx.request.files || {}
    for (let key in files) {
        const file = files[key]
        const reader = fs.createReadStream(Buffer.from(file.path)) //可读流
        const ext = file.name.split('.').pop()
        const filePath = path.join(__dirname, `../static/${Math.random().toString()}.${ext}`)
        const upStream = fs.createWriteStream(filePath)		// 创建可写流
        reader.pipe(upStream)
        filePaths.push(filePath)
    }
    const mag = { "msg": "成功" }
    ctx.body = mag
}

module.exports = {
    'POST /upload': fn_upload
}
