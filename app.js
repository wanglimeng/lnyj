const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const koaBody = require('koa-body');
const views = require('koa-views');
const path = require('path');
const users = require('./models/usersModels.js');
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}));
app.use(koaBody({
	formidable:{uploadDir: './public'},
	multipart: true
}));




router.get('/users',async function (ctx,next) {
	let res = await users.findOne();
	await ctx.render('users',{
		username: res.dataValues.username,
		password: res.dataValues.password

	});
});

app.use(router.routes());









app.listen(3000);
