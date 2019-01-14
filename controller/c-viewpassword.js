const userModel = require('../lib/mysql.js');
const checkLogin = require('../middlewares/check.js').checkLogin;

exports.getPassword = async (ctx) => {
	let uid = ctx.session.user_id;
    	result = await userModel.findPassById(uid);
    	str = result[0].password;
    	console.log(result[0].password);
    	console.log("hello");
    await checkLogin(ctx)
    await ctx.render('viewpassword', {
        session: ctx.session,
        str: str
    })
}