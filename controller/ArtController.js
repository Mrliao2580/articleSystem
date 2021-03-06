const fs = require('fs');
let articleData = require("../mockData/article.json");
const model = require('../model/model.js');
const {
  delsucc,
  delfail,
  exception,
  argsfail,
  addsucc,
  addfail,
  getsucc,
  getfail,
  updsucc,
  updfail
} = require('../util/responseMessage.js');

let ArticleController = {
  allArticle : async (req, res) => {
    let {
      page,
      limit: pagesize,
      title,
      status
    } = req.query;
    let where = 'where 1';
    title && (where += ` and t1.title like '%${title}%'`)
    status && (where += ` and t1.status='${status}'`)
    let offset = (page - 1) * pagesize;
    let sql = `select t1.*,t2.name from article t1 left join category t2 on t1.cat_id = t2.cat_id
                  ${where}
                  order by t1.art_id desc limit ${offset},${pagesize} `;
    let sql2 = `select count(*) as count from article t1 ${where}`
    let promise1 = model(sql);
    let promise2 = model(sql2);
    let result = await Promise.all([promise1, promise2])
    let data = result[0];
    let count = result[1][0].count;
    let response = {
      code: 0,
      count: count,
      data: data,
      msg: ''
    }
    res.json(response)
  },
  delArticle : async (req, res) => {
    let {
      art_id
    } = req.body;
    let sql = `delete from article where art_id = ${art_id}`;
    let result = await model(sql);
    if (result.affectedRows) {
      res.json(delsucc)
    } else {
      res.json(delfail)
    }
  },
  artEdit : (req, res) => {
    res.render('article-edit.html')
  },
  artAdd : (req, res) => {
    res.render('article-add.html')
  },
  postArt : async (req, res) => {
    let {
      title,
      cat_id,
      status,
      content,
      cover
    } = req.body;
    let username = req.session.userInfo.username
    let sql = `insert into article(title,content,author,cat_id,status,cover,publish_date)
                  values('${title}','${content}','${username}',${cat_id},${status},'${cover}',now())
                  `;
    let result = await model(sql)
  
    if (result.affectedRows) {
      res.json(addsucc)
    } else {
      res.json(addfail)
    }
  
  },
  upload : (req, res) => {
    if (req.file) {
      let {
        originalname,
        destination,
        filename
      } = req.file;
      let dotIndex = originalname.lastIndexOf('.');
      let ext = originalname.substring(dotIndex);
      let oldPath = `${destination}${filename}`;
      let newPath = `${destination}${filename}${ext}`;
      fs.rename(oldPath, newPath, err => {
        if (err) {
          throw err;
        }
        res.json({
          message: '上传成功',
          code: 0,
          src: newPath
        })
      })
    } else {
      res.json({
        message: '上传失败',
        code: 1,
        src: ''
      })
    }
  },
  getOneArt : async (req, res) => {
    let {
      art_id
    } = req.query;
    let sql = `select * from article where art_id = ${art_id}`;
    let data = await model(sql);
    res.json(data[0] || {})
  
  },
  updArt : async (req, res) => {
    let {
      cover,
      title,
      cat_id,
      art_id,
      content,
      status,
      oldCover
    } = req.body
    let sql;
    if (cover) {
      sql = `update article set title='${title}',content='${content}',cover='${cover}'
                  ,cat_id=${cat_id},status = ${status} where art_id = ${art_id};`
    } else {
      sql = `update article set title='${title}',content='${content}'
                  ,cat_id=${cat_id},status = ${status} where art_id = ${art_id};`
    }
    let result = await model(sql);
    if (result.affectedRows) {
      cover && fs.unlinkSync(oldCover)
      res.json(updsucc)
    } else {
      res.json(updfail)
    }
  }
}


module.exports = ArticleController;
