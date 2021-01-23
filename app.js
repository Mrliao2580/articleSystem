const express = require('express');
const path = require('path');
const app = express();


// 导入路由模块
const router = require('./router/router.js')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 托管静态资源
app.use('/public',express.static(path.join(__dirname,'public')));

const artTemplate = require('art-template'); 
const express_template = require('express-art-template');

// 模板三件套
app.set('views', __dirname + '/views/');
app.engine('html', express_template); 
app.set('view engine', 'html');

// 使用路由中间件
app.use(router)

app.listen(4000,_=>console.log('prot at 4000'))