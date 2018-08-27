const Koa = require('koa');

const app = new Koa();
// require('koa-router') 返回的是函数
const router = require('koa-router')();
// 解析post
const bodyParser = require('koa-bodyparser');

const koaBody = require('koa-body');
// 解决跨域
const cors = require('koa2-cors');

const controller = require('./controller');

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
