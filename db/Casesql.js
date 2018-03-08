var CaseSQL = {
  insert: "INSERT INTO cases(classifaction,type,cover,cname,content,images)VALUES(?,?,?,?,?,?)",
  queryAll: "SELECT * FROM cases",
  getCaseById: "SELECT * FROM cases WHERE cid = ?"
};


module.exports = CaseSQL;