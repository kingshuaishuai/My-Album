const userModel = require('../lib/mysql.js');
const checkLogin = require('../middlewares/check.js').checkLogin;

exports.getAdmin = async (ctx) => {
    let users = await userModel.findAllUses();
    console.log(users);
    await checkLogin(ctx)
    await ctx.render('admin', {
        session: ctx.session,
        users: users
    })
}
exports.postAdmin = async (ctx) => {
    let {role, user_id} = ctx.request.body;
    console.log(role);
    await userModel.updateUserRole(role, user_id)
        .then((res) => {
            console.log('新信息已保存',res);
            ctx.body = {
                code: 200,
                message: '新信息已保存' 
            };
        });
}

