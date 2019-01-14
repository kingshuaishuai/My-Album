const userModel = require('../lib/mysql.js');
const checkNotLogin = require('../middlewares/check.js').checkNotLogin;
const checkLogin = require('../middlewares/check.js').checkLogin;
const fs = require('fs');

exports.getChangeInfo = async (ctx) => {
    await checkLogin(ctx);
    await ctx.render('changeinfo', {
        session: ctx.session,
    });
};

exports.postChangeInfo = async (ctx) => {
	let { username , realname , gender , age , introduce , user_id } = ctx.request.body;
	console.log([username , realname , gender , age , introduce , user_id]);
	await userModel.findDataByUserId(user_id)
		.then(async (result) => {
			let res = result;
			console.log("-------------------------------");
			console.log(result);
			console.log("-------------------------------");
			console.log(res.length,username,res[0]['username']);
			if(res.length && username === res[0]['username']){
				realname = realname.trim();
				introduce = introduce.trim();

				await userModel.updateUserInfo({realname, gender, age, introduce, user_id})
					.then((res) => {
						console.log('新信息已保存',res);
						console.log('ctx.body',ctx.body);

						ctx.body = {
							code: 200,
							message: '新信息已保存' 
						};
					})
			}else{
				console.log('信息保存失败');

				ctx.body = {
					code: 500,
					message: '信息保存失败'
				}
			}

			await userModel.findDataByName(username)
		        .then((result) => {
		            let res = result;
	                ctx.session = {
	                    user_id: res[0]['user_id'],
	                    username: res[0]['username'],
	                    password: res[0]['password'],
	                    avator: res[0]['avator'],
	                    gender: res[0]['gender'],
	                    role: res[0]['role'],
	                    age: res[0]['age'],
	                    realname: res[0]['realname'],
	                    introduce: res[0]['introduce'],
	                    create_time: res[0]['create_time'],
	                };
	            });
		});
}