var mysql = require('mysql');
var config = require('../config/default.js')

var pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE,
  port     : config.database.PORT
});

let query = ( sql, values ) => {
  return new Promise(( resolve, reject ) => {
    pool.getConnection( (err, connection) => {
      if (err) {
        reject( err );
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err );
          } else {
            resolve( rows );
          }
          connection.release();
        });
      }
    })
  })
}

let user_tbl =
`
    create table if not exists user_tbl(
       user_id INT UNSIGNED AUTO_INCREMENT,
       username VARCHAR(40) NOT NULL COMMENT '用户名',
       password VARCHAR(100) NOT NULL COMMENT '密码',
       avator VARCHAR(100) NOT NULL COMMENT '头像',
       gender TINYINT unsigned NOT NULL DEFAULT '0' COMMENT '性别 0保密 1男 2女', 
       role TINYINT NOT NULL DEFAULT '0' COMMENT '用户角色 0 普通 1管理员 2超级管理',
       realname VARCHAR(40) COMMENT '真实姓名',
       age TINYINT unsigned NOT NULL DEFAULT '0' COMMENT '年龄',
       introduce TEXT COMMENT '个人介绍',
       create_time VARCHAR(100) NOT NULL COMMENT '创建时间',
       PRIMARY KEY ( user_id ),
       UNIQUE KEY ( username )
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;
`

let album_tbl = 
`
    create table if not exists album_tbl(
       img_id INT UNSIGNED AUTO_INCREMENT,
       uid INT NOT NULL  COMMENT '用户id', 
       img_name VARCHAR(100) NOT NULL DEFAULT "新照片" COMMENT '图片名称',
       img_src VARCHAR(100) NOT NULL COMMENT '图片地址',
       create_time VARCHAR(100) NOT NULL COMMENT '上传时间',
       PRIMARY KEY ( img_id )
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;
`


let createTable = ( sql ) => {
  return query( sql, [] )
}

// 建表
createTable(user_tbl);
createTable(album_tbl);

// 注册用户
exports.insertData = ( value ) => {
  let _sql = "insert into user_tbl set username=?,password=?,avator=?,create_time=?;"
  return query( _sql, value );
}

// 删除用户
exports.deleteUserData = ( name ) => {
  let _sql = `delete from user_tbl where username="${name}";`
  return query( _sql )
}

// 查找用户
exports.findUserData = ( name ) => {
  let _sql = `select * from user_tbl where username="${name}";`
  return query( _sql )
}

// 通过id查找用户
exports.findDataByUserId =  ( id ) => {
  let _sql = `select * from user_tbl where user_id="${id}";`
  return query( _sql)
}

// 通过名字查找用户
exports.findDataByName =  ( username ) => {
  let _sql = `select * from user_tbl where username="${username}";`
  return query( _sql)
}

//查找所有用户
exports.findAllUses = () => {
  let _sql = `select * from user_tbl;`
  return query( _sql)
}

// 通过名字查找用户数量判断是否已经存在
exports.findDataCountByName =  ( username ) => {
  let _sql = `select count(*) as count from user_tbl where username="${username}";`
  return query( _sql)
}

//更新修改个人信息
exports.updateUserInfo = ({realname,gender,age,introduce,user_id}) => {
  let _sql = `update user_tbl set realname="${realname}",gender="${gender}",age="${age}",introduce="${introduce}" where user_id="${user_id}";`
  console.log(_sql);
  return query(_sql);
}

//更新修改管理员信息
exports.updateUserRole = (role,user_id) => {
  let _sql = `update user_tbl set role="${role}" where user_id="${user_id}";`
  console.log(_sql);
  return query(_sql);
}

// 注册用户
exports.insertImage = ( value ) => {
  console.log(value)
  let _sql = `insert into album_tbl set uid=?,img_name=?,img_src=?,create_time=?;`
  return query( _sql, value );
}
// 按用户id查找图片
exports.findImgsByUserId =  ( id ) => {
  let _sql = `select img_src from album_tbl where uid="${id}";`
  return query( _sql)
}
exports.findPassById =  ( id ) => {
  let _sql = `select password from user_tbl where user_id="${id}";`
  return query( _sql)
}

