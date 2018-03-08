var UserSQL = {
  insert: "INSERT INTO User(uid,userName,city,age) VALUES(?,?,?,?)",
  queryAll: "SELECT * FROM User",
  getUserById: "SELECT * FROM User WHERE uid = ?",
  queryArticle: "SELECT * FROM article"
};


module.exports = UserSQL;