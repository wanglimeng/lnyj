let Router = require('koa-router');
let artcle = require('../models/articleModels.js');
let router = new Router();

router.post('/',async function (ctx,next) {
	let users = ctx.request.body.users;
	let title = ctx.request.body.title;
	let html = ctx.request.body.html;
	let md = ctx.request.body.md;
	try {
		let res =await artcle.create({
			username:users,
			article_title:title,
			article_content:html,
			article_md:md
		});
	// console.log(ctx.request.body);
	// console.log('--------------------');
	// console.log(res);
			ctx.body= {
				success: 1,
				message: '成功',
			};
	} catch (e) {
		ctx.body = {
			success: 0,
			message: e
		}
	}
	
});





module.exports = router;