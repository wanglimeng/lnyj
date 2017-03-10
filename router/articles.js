let Router = require('koa-router');
let artcle = require('../models/articleModels.js');
let router = new Router();

router.get('/',async function (ctx,next) {
	if (ctx.session.users) {
		await ctx.render('articles',{users:ctx.session.users});
	} else {
		ctx.redirect('/users/login');
	}
	
});

router.get('/list',async function (ctx) {
	let res = await artcle.findAll({username:ctx.session.users});
	console.log(res.length);
	
	await ctx.render('articles_list',{res:res});
});

router.get('/alter/:id',async function (ctx,next) {
	let id = ctx.params.id;
	let res = await artcle.findOne({'where':{
		'id':id
	}});
	let md = res.dataValues.article_md;
	let title = res.dataValues.article_title;
	
	await ctx.render('articles_alter.ejs',{
		id:id,
		md:md,
		title:title
	});
	
	
});

router.get('/remove/:id',async function (ctx,next) {
	let id = ctx.params.id;
	
	
	await artcle.destroy({
		where: {
			username:ctx.session.users,
			id:id
		}
	});
	ctx.redirect('/articles/list');
	
});









module.exports = router;