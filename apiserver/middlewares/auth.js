const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.get("accesstoken");
  if (!token) {
    res.status(403).send("不允许访问");
  } else {
    jwt.verify(token, "MY_GOD", (err, data) => {
      if (err) {
        res.status(401).send("身份验证失败");
      } else {
        req.userInfo = data;
        next();
      }
    });
  }
};
