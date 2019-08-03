const express = require("express");
const server = express();

//引出拆分出去的路由文件
const userRouter = require("./routes/user");
const studentRouter = require("./routes/student");

//中间件
server.use(express.json());
server.use(express.urlencoded({extended: true }));
server.use(express.static('./public'));


server.use((req, res, next) =>{
    res.set("Access-Control-Allow-Origin", "*");
    next();
});

//路由
server.use('/api', [userRouter,studentRouter]);


server.listen(3000);