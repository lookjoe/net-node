const Sequelize = require('sequelize')
const config = require('./config')
const uuid = require('node-uuid')

function generateId () {
  return uuid.v4()
}

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

const ID_TYPE = Sequelize.INTEGER(50)

function defineModel (name, attributes) {
  var attrs = {}
  for (let key in attributes) {
    let value = attributes[key]
    if (typeof value === 'object' && value['type']) {
      value.attributes = value.allowNull || false
      attrs[key = value]
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      }
    }
  }
  // 唯一标识符id
  // attrs.ID = {
  //   type: ID_TYPE,
  //   primaryKey: true,
  //   autoIncrement: true
  // }
  attrs.id = {
    type: ID_TYPE,
    // 自增id
    autoIncrement: true,
    primaryKey: true
  }
  attrs.createdAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  }
  attrs.updateAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  }
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false
  }
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: function (obj) {
        let now = Date.now()
        if (obj.isNewRecord) {
          // if (!obj.ID) {
          //   obj.ID = generateId()
          // }
          // console.log('obj.id', obj.ID)
          obj.createdAt = now
          obj.updateAt = now
          obj.version = 0
        } else {
          obj.updateAt = now
          obj.version++
        }
      }
    }
  })
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN']

var exp = {
  defineModel: defineModel,
  sync: (name) => {
    // 创建表
    // if (process.env.NODE_ENV !== 'production') {
    name.sync({ force: false })
    // } else {
    //   throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.')
    // }
  }
}

for (let type of TYPES) {
    exp[type] = Sequelize[type]
}

exp.ID = ID_TYPE
exp.generateId = generateId

module.exports = exp
