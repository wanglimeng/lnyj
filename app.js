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
const users = require('./router/users.js');
const articles = require('./router/articles.js');
const upload = require('./router/upload.js');
const save = require('./router/save.js');
const list = require('./router/list.js');
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
	formidable:{uploadDir: './public/images'},
	multipart: true
}));

//静态文件服务
app.use(serve(__dirname + '/public'));


router.use('/',index.routes(),index.allowedMethods());


router.use('/users',users.routes(),users.allowedMethods());


router.use('/articles',articles.routes(),articles.allowedMethods());


router.use('/upload',upload.routes(),upload.allowedMethods());

router.use('/save',save.routes(),save.allowedMethods());
router.use('/list',list.routes(),list.allowedMethods());

app
.use(router.routes())
.use(router.allowedMethods());


app.listen(3000);
