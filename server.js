const Koa = require('koa')
const koajwt = require('koa-jwt')
const app = new Koa()
const koaBody = require('koa-body')
// 解决跨域
const cors = require('koa2-cors')

// require('koa-router') 返回的是函数
// const router = require('koa-router')()
app.use(cors())

// 自动扫描 router后使用
const controller = require('./libs/controller')

// 错误处理
app.use(async (ctx, next) => {
    await next().catch((err) => {
        if(err.status === 401){
            ctx.status = 401
            ctx.body = 'Protected resource, use Authorization header to get access\n'
        }
    })
})

// 验证 header 是否携带 my_token 密钥生产的token
app.use(koajwt({
    secret: 'my_token'
}).unless({
    path: [/login/, /signin/]
}))

app.use(koaBody({
    multipart: true, // 支持文件上传
    formidable:{
        keepExtensions: true,    // 保持文件的后缀
        maxFileSize: 2 * 1024 * 1024 * 1024
    }
}))

// 使用middleware:
app.use(controller())

app.listen(3000)
