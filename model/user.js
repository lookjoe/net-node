const db = require('../libs/db')
const model = require('../libs/model')

module.exports = db.defineModel('info', {
  name: db.STRING(100),
  password: db.STRING(100)
})
