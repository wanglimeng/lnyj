const md5 = require('md5');
let User = require('../models/usersModels.js');
let Router = require('koa-router');

let router = new Router();

router.get('/login',async function (ctx,next) {
	await ctx.render('users_login.ejs',{});
});

router.get('/sign_in',async function (ctx,next) {
	await ctx.render('users_sign_in.ejs',{});
});

router.post('/sign_in',async function (ctx,next) {
	let username = ctx.request.body.username;
	let password = ctx.request.body.password;
	let password1 = ctx.request.body.password1;
	let email = ctx.request.body.email;
	let pas = md5(password);
	
	if (username == "" || password == "" || password1 == "" || email == "") {
		ctx.body = "不能为空";
	} else if (password != password1) {
		console.log(password===password1);
		ctx.body = "两次密码不一致";
	} else {
		await User.create({
			username:username,
			password:password,
			email:email
		});
		ctx.redirect('/');
	}
});





module.exports = router;