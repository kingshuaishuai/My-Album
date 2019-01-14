const userModel = require('../lib/mysql.js');
const checkLogin = require('../middlewares/check.js').checkLogin;

exports.getMyAlbum = async (ctx) => {
	let uid = ctx.session.user_id;
    	imgs = await userModel.findImgsByUserId(uid);
    	console.log(imgs)
    await checkLogin(ctx)
    await ctx.render('myalbum', {
        session: ctx.session,
        imgs: imgs
    })
}