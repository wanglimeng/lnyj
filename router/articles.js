let Router = require('koa-router');

let router = new Router();

router.get('/',async function (ctx,next) {
	await ctx.render('articles',{users:ctx.session.users});
});





module.exports = router;