const userModel = require('../lib/mysql.js');
const md5 = require('md5');
const checkNotLogin = require('../middlewares/check.js').checkNotLogin;
const checkLogin = require('../middlewares/check.js').checkLogin;


exports.getSignin = async (ctx) => {
    await checkNotLogin(ctx)
    await ctx.render('signin', {
        session: ctx.session,
    })
}

// 登录信息
exports.postSignin = async (ctx) => {
    console.log(ctx.request.body)
    
    let { username, password } = ctx.request.body;

    await userModel.findDataByName(username)
        .then((result) => {
            let res = result;
            if (res.length && username === res[0]['username'] && md5(password) === res[0]['password']) {
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

                console.log(ctx.session);

                ctx.body = {
                    code: 200,
                    message: '登录成功'
                };
                console.log('ctx.session.id', ctx.session.id)
                console.log('session', ctx.session)
                console.log('登录成功')
            } else {
                ctx.body = {
                    code: 500,
                    message: '用户名或密码错误'
                }
                console.log('用户名或密码错误!')
            }
        }).catch(err => {
            console.log(err);
        });
}