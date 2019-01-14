const userModel = require('../lib/mysql.js');
const checkLogin = require('../middlewares/check.js').checkLogin;

exports.getInfo = async (ctx) => {
    await checkLogin(ctx)
    await ctx.render('myinfo', {
        session: ctx.session,
    })
}