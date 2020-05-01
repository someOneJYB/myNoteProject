const Router = require('koa-router');
const fs = require('fs')
const path = require('path')
const multer = require('koa-multer')
const { join } = require('path')
const picUrl = 'http://localhost:9035/'
const storage = multer.diskStorage({
    // 存储的位置
    destination: join(process.cwd(), "noteStaticAssets"),
    // 文件名
    filename(req, file, cb){
        const filename = file.originalname.split(".")
        cb(null, `${Date.now()}.${filename[filename.length - 1]}`)
    }
})
const upload = multer({storage})

const json = require('../note/link')

const sendJson = Object.keys(json).map(item => {
    return {
        ...json[item]
    }
})
const total = sendJson.length
const router = new Router();
const cacheFile = {}

router.get('/api/:count',async(ctx, next)=>{
    let count = ctx.params.count
    if(!cacheFile[count]) {
        const result = fs.readFileSync(path.resolve(__dirname, `../note/${count}.md`), 'utf-8');
        cacheFile[count] = {
            data: result,
            title: json[count].title
        }
    }
    ctx.body = cacheFile[count]

})
router.post('/upload', upload.single('file'), async ctx => {
    console.log('ctx.req.file.filename', ctx.req.file.filename)
    ctx.body = {
        filename: picUrl + ctx.req.file.filename
    }
})
function initNoteJson(obj) {
    const g = {
        ...json,
        [total]: obj,
    }
    console.log(path.join(__dirname, '../note/link.json'))
    fs.writeFileSync(path.join(__dirname, '../note/link.json'), JSON.stringify(g, null, 2))
}

router.post('/setMdData', async ctx => {
    const { text = '', type = '', img = '', title = '' } = ctx.request.body.data
    initNoteJson({
        "title": title,
        "connected": [type],
        "desc": title,
        "mdSrc": total,
        "img": img || "http://127.0.0.1:8080/1-2.png"
    })
    try {
        fs.writeFileSync(path.join(__dirname, `../note/${total}.md`), text)
        ctx.body = {
            code: 0,
            message: 'ok'
        }
    } catch(err) {
        ctx.body = {
            code: 0,
            message: 'error'
        }
    }


})

router.get('/getAllNote',async(ctx, next)=>{
  let { page = 1, pageSize = 5 } = ctx.query;
  page = +page;
  pageSize = +pageSize
  ctx.body = {
      code: 0,
      page: page + 1,
      data: sendJson.slice((page-1)*pageSize, page * pageSize),
      total,
  }
})

module.exports = router
