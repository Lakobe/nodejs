// 学生相关的路由代码
const express = require('express');
const router = express.Router();

const StudentModel = require('../models/student');

/**
 * 
 * 学生查询
 * GET /api/student
 */
router.get('/student',async(req, res) =>{
    let pageNum = parseInt(req.query.pageNum) || 1;
    let pageSize = parseInt(req.query.pageSize) ||5;

    let searchName = req.query.searchName;
    searchName = new RegExp(searchName);

    let num = await StudentModel.find({ name: searchName }).count();
    let totalPage = Math.ceil(num / pageSize);

    let studentList = await StudentModel.find({ name: searchName })
    .skip((pageNum - 1) * pageSize).limit(pageSize);

    res.send({
        code: 0,
        msg:"ok",
        data:{
            list: studentList,
            totalPage
        }
    });
});


/**
 * 
 * 学生添加
 * POST /api/student
 */
router.post('/student',async(req, res) => {
    let student = new StudentModel(req.body);
    student.save()
    .then(() => {
        res.send({
            code: 0,
            msg:"添加成功"
        });
    }).catch(error =>{
        res.send({
            code: -1,
            msg:error.message
        });
    });
});


module.exports =router;