const user = require('../controller/user')

var fn_signin = async (ctx, next) => {
    let name = ctx.request.body.name
    let password = ctx.request.body.password
    let msg = {}
    let userData = await user.findUser(name)
    if (!name || !password) {
        msg = {"error": "请填写账号或密码"}
    } else if (userData) {
        msg = {"error": "用户名已存在"}
    } else {
        await user.createUser(name, password)
        let data = await user.findUser(name)
        msg = {"msg": JSON.stringify(data.dataValues)}
    }
    ctx.body = msg
}

module.exports = {
    'POST /signin': fn_signin
}
