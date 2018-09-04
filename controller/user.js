const user = require('../libs/model')
const exp = require('../libs/db')

var User = user.user

async function createUser (name, password) {
  await User.create({
    name: name,
    password: password
  })
}

async function findUser (name) {
  let res = await User.findOne({
    where: {
      name: `${name}`
    }
  })
  return res
}

module.exports = {
  createUser,
  findUser
}
