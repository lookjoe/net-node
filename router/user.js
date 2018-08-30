var fn_login = async (ctx, next) => {
  let name = ctx.request.body.name || ''
  let password = ctx.request.body.password || ''
  if (name === 'joe' && password === '123456') {
    let success = { "msg": "成功" }
    ctx.response.body = success
   } else {
     let err = { "error": "失败" }
     ctx.response.body = err
   }
}

module.exports = {
  'POST /login': fn_login
}
