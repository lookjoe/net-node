const fs = require('fs')
const db = require('./db')
const path = require('path')

let files = fs.readdirSync(path.resolve(__dirname, '../models'))

let js_files = files.filter((f) => {
    return f.endsWith('.js')
})

for (let f of js_files) {
    let name = f.substring(0, f.length - 3)
    let modelName = require(`../models/${name}`)
    db.sync(modelName)
    // 暴露表模型name，实例
    module.exports[name] = require(`../models/${name}`)
}
// console.log('js_files', js_files)
//
// 暴露创建表方法
// module.exports.sync = () => {
    //   db.sync()
// }

// 自动扫描models创建模型
