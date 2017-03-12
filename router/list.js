let Router = require('koa-router');
let artcle = require('../models/articleModels.js');
let router = new Router();

router.get('/:id',async function (ctx,next) {
	let res = await artcle.findOne(
	{
		'where': {
			'id':ctx.params.id
		}
	}
	);
	let title = res.dataValues.article_title;
	let html = res.dataValues.article_content;
	
	await ctx.render('list',{
		users:ctx.session.users,
		title:title,
		html:html
	});
});





module.exports = router;