const express = require('express');
const path = require('path');
const app = express();
let session = require('express-session');
const router = require('./router/router.js')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 定义中间件，托管静态资源
app.use('/public',express.static(path.join(__dirname,'public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

const artTemplate = require('art-template'); 
const express_template = require('express-art-template');

// 三件套
app.set('views', __dirname + '/views/');
app.engine('html', express_template);
app.set('view engine', 'html');

let options = {
    name:"SESSIONID",
    secret: "FGVH$#E%&",
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge:60000*24,
    }
};
app.use( session(options) )
app.use(function(req,res,next){
    let path = req.path.toLowerCase();
    let noCheckAuth = ['/login','/signin','/logout']
    if(noCheckAuth.includes(path)){
        next();
    }else{
        if(req.session.userInfo){
            next()
        }else{
            next()
        }
    }
});
app.use(router)

app.listen(4000,_=>console.log('server is running at port 4000'))