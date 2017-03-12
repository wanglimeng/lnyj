let Router = require('koa-router');
let artcle = require('../models/articleModels.js');
let router = new Router();

router.get('/',async function (ctx,next) {
	let res = await artcle.findAll({
		'attributes': ['id', 'article_title']
	});
	
	await ctx.render('index',{
		users:ctx.session.users,
		res:res
	});
});





module.exports = router;