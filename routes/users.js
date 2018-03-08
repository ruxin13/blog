var express = require('express');
var router = express.Router();

var mysql = require("mysql");
var dbConfig = require("../db/DBConfig");
var userSQL = require("../db/Usersql");

// 使用DBConfig.js的配置信息创建一个Mysql连接池
var pool = mysql.createPool(dbConfig.mysql);

// 响应一个JSON数据
var responseJSON = function (res, ret) {
  if (typeof ret === "undefined") {
    res.json({
      code: "-200",
      msg: "操作失败"
    });
  } else {
    res.json(ret);
  }
};


router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 添加用户
router.get("/addUser", function (req, res, next) {

  // 从连接池获取连接
  pool.getConnection(function (err, connection) {

    // 获取从前端传过来的参数
    var param = req.query || req.params;

    // 建立连接，增加一个用户信息
    connection.query(userSQL.insert, [param.uid, param.name], function (err, result) {
      if (result) {
        result = {
          code: 200,
          msg: "增加成功"
        }
      }

      // 以JSON形式，把操作结果返回前端页面
      responseJSON(res, result);

      // 释放连接
      connection.release();

    });
  })
});


// 根据ID查询用户
router.get('/user', function(req, res, next) {
  pool.getConnection(function (err, connection) {
    var param = req.query || req.params;
    connection.query(userSQL.getUserById, param.id, function (err, result) {
      if (result) {
        responseJSON(res, result);
      }
      connection.release();
    });
  })
});

// 查询所有的用户
router.get('/users', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    connection.query(userSQL.queryAll, function (err, result) {
      if (result) {
        responseJSON(res, result);
      }
      connection.release();
    })
  })
});


// 插入新用户
router.post('/add', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    var param = req.body;
    connection.query(userSQL.insert, [param.uid, param.name, param.city, param.age], function (err, result) {
      if (result) {
        responseJSON(res, "{msg:添加成功}");
      }
      connection.release();
    })
  })
});



module.exports = router;
