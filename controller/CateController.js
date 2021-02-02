
let CateController = {}
const model = require('../model/model.js');
const {delsucc,delfail,exception,argsfail,addsucc,addfail,getsucc,getfail,updsucc,updfail} 
= require('../util/responseMessage.js');
CateController.catindex = (req,res)=>{
    res.render('category-index.html')
}
CateController.getCate = async (req,res)=>{
    let sql = "select * from category order by sort desc"
    let data = await model(sql)
    res.json(data)
}
CateController.getOneCate = async (req,res)=>{
   let {cat_id} = req.query;
   if(!cat_id){
       res.json(argsfail)
   }else{
       let sql = `select * from category where cat_id = ${cat_id}`;
       let data = await model(sql);
       if(data.length){
            data[0].errcode = 0;
            res.json(data[0])
       }else{
           res.json(getfail)
       }
   }
}

CateController.updCate = async (req,res)=>{
    let {cat_id,name,sort,add_date} = req.body
    if(!cat_id){
        res.json(argsfail);
        return;
    }
    let sql = `update category set name='${name}',sort=${sort},add_date='${add_date}' 
                where cat_id = ${cat_id}
            `;
    let result = await model(sql)
    if(result.affectedRows){
        res.json(updsucc)
    }else{
        res.json(updfail)
    }
}

CateController.delCat = async (req,res)=>{
    let {cat_id} = req.body;
    if(!cat_id){
        res.json(argsfail)
    }else{
        cat_id = parseInt(cat_id);
        let sql = `delete from category where cat_id = ${cat_id}`
        let result;
        let response;
        try{
            result = await model(sql)
            if(result.affectedRows){
                response =  delsucc;
            }else{
                response =  delfail;
            }
        }catch(e){
            response =  exception;
        }
        res.json(response)
    }
}
CateController.catadd = (req,res)=>{
    res.render('category-add.html')
}
CateController.catedit = (req,res)=>{
    res.render('category-edit.html')
}
CateController.postCat = async (req,res)=>{
    let {name,sort,add_date} = req.body;
    let sql = `insert into category(name,sort,add_date) values('${name}',${sort},'${add_date}')`
    console.log(sql);
    let result = await model(sql);
    if(result.affectedRows){
        res.json(addsucc)
    }else{
        res.json(addfail)
    }
}
module.exports = CateController;