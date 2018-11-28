const user = require('../controller/user'),
    jwt = require('jsonwebtoken')

var fn_login = async (ctx, next) => {
    let name = ctx.request.body.name || ''
    let password = ctx.request.body.password || ''
    let msg = {}
    if (name === '' || password === '') {
        msg = { "error": "失败" }
        ctx.body = msg
        return
    }
    let userData = await user.findUser(name)
    if (name === userData.dataValues.name && password === userData.dataValues.password) {
        msg = { 
            name: userData.dataValues.name,
            id: userData.dataValues.id,
            version: userData.dataValues.version
        }
        // 生成 token
        const token = jwt.sign({
            name: userData.dataValues.name,
            id: userData.dataValues.name
        },
        'my_token',
        { expiresIn: '1 days' })
        ctx.body = {
            ...msg,
            token
        }
        return
    }
    msg = { "error": "失败" }
    ctx.body = msg
}

module.exports = {
    'POST /login': fn_login
}
