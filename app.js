const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const koaBody = require('koa-body');
const views = require('koa-views');
const serve = require('koa-static');
const favicon = require('koa-favicon');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const MysqlStore = require('koa-mysql-session');
const onerror = require('koa-onerror');
const path = require('path');
const config = require('./config/config.js');
const index = require('./router/index.js');

//错误处理
onerror(app);
app.keys = ['SESSIONID'];

//mysqlSession中间件
app.use(session({
	store: new MysqlStore(config.mysqlSession),
	rolling: true,
	cookie: {
		maxage: 30* 60 * 1000
	}
}));

//日志中间件
app.use(logger());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}));


app.use(koaBody({
	formidable:{uploadDir: './public'},
	multipart: true
}));

//静态文件服务
app.use(serve(__dirname + '/public'));


router.use('/',index.routes(),index.allowedMethods());
app
.use(router.routes())
.use(router.allowedMethods());










app.listen(3000);
