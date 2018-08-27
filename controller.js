const fs = require('fs')

function addMapping (router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4)
      router.get(path, mapping[url])
    } else if (url.startsWith('POST ')) {
      let path = url.substring(5)
      router.post(path, mapping[url])
    } else {
      console.log(`invalid URL: ${url}`)
    }
  }
}

function addControllers (router, dir) {
  let files = fs.readdirSync(dir)
  let js_files = files.filter((f) => {
    return f.endsWith('.js')
  })
  for (let f of js_files) {
    let mapping = require(dir + '/' + f)
    addMapping(router, mapping)
  }
}

module.exports = function (dir) {
    let controllers_dir = dir || './router', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')()
    addControllers(router, controllers_dir)
    return router.routes()
}
