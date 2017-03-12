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
	let res = await artcle.findAll({
		'where': {
			'username':ctx.session.users
		}
	});
	
	
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

router.get('/md/:id',async function (ctx) {
	let id = ctx.params.id;
	let res= await artcle.findOne({
		'where': {
			'id':id
		}
	});
	let md = res.dataValues.article_md;
	ctx.body = md;
});

router.post('/update',async function (ctx) {
	let id = ctx.request.body.users;
	let title = ctx.request.body.title;
	let html = ctx.request.body.html;
	let md = ctx.request.body.md;
	let res=await artcle.update(
		{
			'article_title':title,
			'article_content':html,
			'article_md':md
		},
		{
			'where': {
				'id':id
			}
		}
		);
	ctx.body = {
		success:1,
		message:'成工'
	};
});







module.exports = router;