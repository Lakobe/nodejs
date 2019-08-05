const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/user");

//注册
router.post("/sign-up", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let newPassword = bcryptjs.hashSync(password, 10);

  let user = new UserModel({
    username,
    password: newPassword
  });

  user
    .save()
    .then(() => {
      res.send({
        code: 0,
        msg: "注册成功"
      });
    })
    .catch(error => {
      res.send({
        code: -1,
        msg: error.message
      });
    });
});

/**
 * 登录
 * POST /api/sign-in
 */
router.post("/sign-in", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let data = await UserModel.findOne({ username });

  if (data) {
    if (bcryptjs.compareSync(password, data.password)) {
      const token = jwt.sign(
        {
          userId: data._id
        },
        "MY_GOD"
      );
      res.send({
        code: 0,
        msg: "登录成功",
        data: {
          userInfo: {
            userId: data._id,
            username: data.username,
            avatar: data.avatar
          },
          token: token
        }
      });
    } else {
      res.send({
        code: -1,
        msg: "用户名或密码错误"
      });
    }
  } else {
    res.send({
      code: -1,
      msg: "用户错误"
    });
  }
});

// 暴露 router
module.exports = router;
