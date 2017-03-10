let Router = require('koa-router');
let artcle = require('../models/articleModels.js');
let router = new Router();

router.post('/',async function (ctx,next) {
	let users = ctx.request.body.users;
	let title = ctx.request.body.title;
	let html = ctx.request.body.html;

	await artcle.create({
		username:users,
		article_title:title,
		article_content:html
	});
	console.log(ctx.request.body);
});





module.exports = router;