module.exports ={

  // 已经登录了
  checkNotLogin: (ctx) => {
    if (ctx.session && ctx.session.username) {     
      ctx.redirect('/myinfo');
      return false;
    }
    return true;
  },
  //没有登录
  checkLogin: (ctx) => {
    if (!ctx.session || !ctx.session.username) {     
      ctx.redirect('/signin');
      return false;
    }
    return true;
  }
}