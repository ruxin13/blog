
var express = require('express');
var router = express.Router();

var mysql = require("mysql");
var dbConfig = require("../db/DBConfig");
var indexSQL = require("../db/Indexsql");

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



// 查询所有的服务
router.get('/', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    connection.query(indexSQL.queryAll, function (err, result) {
      if (result) {
        responseJSON(res, result[0]);
      }
      connection.release();
    })
  })
});

module.exports = router;