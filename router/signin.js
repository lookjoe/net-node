// function create () {
//   tableUsers.create({
//     ID: 4,
//     name: 'joe23',
//     password: '123456'
//   })
// }
var fn_signin = async (ctx, next) => {
  // create()
  let res = { "msg": "暂未开放注册" }
  ctx.response.body = res
}

module.exports = {
  'POST /signin': fn_signin
}
