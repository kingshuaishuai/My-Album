const userModel = require('../lib/mysql.js');
const md5 = require('md5');
const checkNotLogin = require('../middlewares/check.js').checkNotLogin;
const checkLogin = require('../middlewares/check.js').checkLogin;
const moment = require('moment');
const fs = require('fs');

exports.getUploadImg = async (ctx) => {
    await checkLogin(ctx);
    await ctx.render('uploadimg', {
        session: ctx.session,
    });
};


// exports.postUploadImg = async (ctx) =>{

// }


exports.postUploadImg = async (ctx) => {
	let {img_name, img_src, uid} =  ctx.request.body;
	console.log("从浏览器拿到数据了",img_name, img_src, uid)
	if(img_name.trim() === ''){
		ctx.body = {
			code: 500,
			message: '请填写图片名称'
		};
	}else if(img_src && img_src.trim() === ''){
		ctx.body = {
			code: 500,
			message: '请上传照片'
		};
	}else {
		let base64Data = img_src.replace(/^data:image\/\w+;base64,/, ""),
			dataBuffer = new Buffer(base64Data, 'base64'),
            getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now(),
            upload = new Promise((reslove, reject) => {
                fs.writeFile('./public/images/' + getName + '.png', dataBuffer, err => {
                    if (err) {
                        throw err;
                        reject(false)
                    }
                    reslove(true);
                    console.log('照片上传成功');
                });
            });

		if(upload) {
			console.log("---------------控制器要干活了----------");
			console.log(uid, img_name, img_src, moment().format('YYYY-MM-DD HH:mm:ss'))
			await userModel.insertImage([uid, img_name, getName + '.png', moment().format('YYYY-MM-DD HH:mm:ss')])
				.then((res) => {
					console.log('上传成功', res);
					ctx.body = {
						code: 200,
						message: '上传成功'
					};
				})
				console.log("---------------控制器干完了----------");
		} else {
			console.log('上传失败');
			ctx.body = {
				code: 500,
				message: '上传失败'
			}
		}
	}
}