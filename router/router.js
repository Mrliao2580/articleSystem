let express = require('express');

let router = express.Router();

const multer = require('multer');
let upload = multer({
    dest: 'uploads/'
})
const model = require('../model/model.js');
const CateController = require('../controller/CateController.js');
const ArtController = require('../controller/ArtController.js');
const UserController = require('../controller/UserController.js');
router.get('/cateCount', async (req, res) => {
    let sql = `select count(*) total ,t2.name,t1.cat_id from article t1 
                left join category t2 
                on t1.cat_id = t2.cat_id 
                group by  t1.cat_id`;
    let data = await model(sql);
    res.json(data)
})

router.get(/^\/$|^\/admin$/, (req, res) => {
    res.render('index.html')
})

router.get('/artindex', (req, res) => {
    res.render('article-index.html')
})
router.get('/catindex', CateController.catindex)
router.get('/catadd', CateController.catadd)
router.get('/catedit', CateController.catedit)
router.post('/postCat', CateController.postCat)
router.get('/artadd', (req, res) => {
    let data = {
        name: '西红柿炒蛋'
    }
    res.render('article-add.html', data)
})
router.get('/getCate', CateController.getCate)
router.get('/getOneCate', CateController.getOneCate)
router.post('/delCat', CateController.delCat)
router.post('/updCate', CateController.updCate)
router.post('/delArticle', ArtController.delArticle)
router.get('/addart', ArtController.artAdd)
router.get('/artedit', ArtController.artEdit)
router.post('/postArt', ArtController.postArt)
router.post('/upload', upload.single('file'), ArtController.upload)
router.get('/getOneArt', ArtController.getOneArt)
router.post('/updArt', ArtController.updArt)
router.get('/login', (req, res) => {
    if (req.session.userInfo) {
        res.redirect('/');
        return
    }
    res.render('login.html')
})
router.post('/signin', UserController.signin)
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            throw err;
        }
    })
    res.json({
        message: '退出成功'
    })
})
router.all('*', (req, res) => {
    res.json({
        errcode: 10004,
        message: "请求错误"
    })
})
module.exports = router;