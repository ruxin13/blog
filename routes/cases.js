var express = require('express');
var router = express.Router();

var mysql = require("mysql");
var dbConfig = require("../db/DBConfig");
var caseSQL = require("../db/Casesql");

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


// 根据ID查询案例
router.get('/case', function(req, res, next) {
  pool.getConnection(function (err, connection) {
    var param = req.query || req.params;
    connection.query(caseSQL.getCaseById, param.cid, function (err, result) {
      if (result) {
        responseJSON(res, result);
      }
      connection.release();
    });
  })
});


// 查询所有的案例
router.get('/cases', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    connection.query(caseSQL.queryAll, function (err, result) {
      if (result) {
        responseJSON(res, result);
      }
      connection.release();
    })
  })
});

// 添加案例
router.post('/add', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    var param = req.body;
    connection.query(caseSQL.insert, [param.classifaction, param.type, param.cover, param.cname, param.content, param.images], function (err, result) {
      if (result) {
        responseJSON(res, {
          code: 200,
          msg: "添加成功"
        });
      }
      connection.release();
    })
  })
});

module.exports = router;