const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const koaBody = require('koa-body');
const views = require('koa-views');
const serve = require('koa-static');
const favicon = require('koa-favicon');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const MysqlStore = require('koa-mysql-session')
const path = require('path');
const users = require('./models/usersModels.js');
const config = require('./config/config.js');

app.keys = ['SESSIONID'];
app.use(session({
	store: new MysqlStore(config.mysqlSession),
	rolling: true,
	cookie: {
		maxage: 30* 60 * 1000
	}
}))
app.use(logger());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}));
app.use(koaBody({
	formidable:{uploadDir: './public'},
	multipart: true
}));
app.use(serve(__dirname + '/public'));



router.get('/users',async function (ctx,next) {
	let res = await users.findOne();
	await ctx.render('users',{
		username: res.dataValues.username,
		password: res.dataValues.password

	});
});

router.post('/users' ,async function (ctx,next) {
	console.log(ctx.request.body);
	ctx.body = 'wanglimeng';
});
router.get('/session', async function (ctx) {
	ctx.session.test = 'test';
	ctx.body = ctx.session.test;
});
app.use(router.routes());









app.listen(3000);
