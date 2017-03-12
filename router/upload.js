let Router = require('koa-router');
const fs = require('mz/fs');
const path = require('path');
let router = new Router();

router.post('/',async function (ctx,next) {
	let files = ctx.request.body.files['editormd-image-file'];
	let filepath = files.path;
	let filename = files.name;
	
	let ext = path.extname(filename);
	let newfilename = filepath+ext;

	let http=await fs.rename(filepath,newfilename);

	ctx.body = {
		success : 1,
		message : "成功",
		url: "http://localhost:3000" +filepath.replace("public","")+ext
	};

	
});





module.exports = router;