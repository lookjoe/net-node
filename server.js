const Koa = require('koa');

const app = new Koa();

const koaBody = require('koa-body');
// 解决跨域
const cors = require('koa2-cors');

const Sequelize = require('sequelize');

const db = require('./libs/db')
// console.log('db', db)
const model = require('./libs/model')
// const mysql = require('mysql');
const config = require('./libs/config')

// require('koa-router') 返回的是函数
const router = require('koa-router')();

const controller = require('./libs/controller');

app.use(cors());

app.use(koaBody({
  multipart: true, // 支持文件上传
  formidable:{
    keepExtensions: true,    // 保持文件的后缀
    maxFileSize: 2 * 1024 * 1024 * 1024
  }
}));

// 使用middleware:
app.use(controller());

app.listen(3000);
