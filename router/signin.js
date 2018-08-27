var fn_signin = async (ctx, next) => {
  let res = { "msg": "暂未开放注册" }
  ctx.response.body = res
}

module.exports = {
  'GET /signin': fn_signin
}
