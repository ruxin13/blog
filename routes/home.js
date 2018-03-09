const express = require("express");
const router = express.Router();


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


router.get("/", function(req, res){
  // res.render("home",{
  //   name: "lishu",
  //   id: 2
  // });

  // 测试用！！！！！返回环境变量
  responseJSON(res, process.env.NODE_ENV);

});




module.exports = router;