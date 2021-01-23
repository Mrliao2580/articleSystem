let express = require('express');

let router = express.Router();

// 导入相应的控制器
const CateController = require('../controller/CateController.js');
const ArtController = require('../controller/ArtController.js');

router.get(/^\/$|^\/admin$/,(req,res)=>{
    res.render('index.html')
})

// 文章
router.get('/artindex',(req,res)=>{
    res.render('article-index.html')
})

router.get('/catindex',CateController.catindex)

router.get('/catadd',CateController.catadd)

router.get('/catedit',CateController.catedit)

// 提交分类数据
router.post('/postCat',CateController.postCat)

router.get('/artadd',(req,res)=>{
    res.render('article-add.html',data)
})

// 所有分类数据的接口
router.get('/getCate',CateController.getCate)

// 所有分类数据的接口
router.get('/getOneCate',CateController.getOneCate)

// 删除分类的接口
router.post('/delCat',CateController.delCat)

// 编辑分类的接口
router.post('/updCate',CateController.updCate)

// 文章数据接口
router.get('/allarticle',ArtController.allArticle)

router.all('*',(req,res)=>{
    res.json({errcode:10004,message:"请求错误"})
})

module.exports = router;

