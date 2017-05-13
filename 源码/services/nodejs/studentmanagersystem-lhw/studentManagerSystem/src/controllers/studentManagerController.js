/*
* 处理学生的增删改查
* */

const path = require('path');
const xtpl = require('xtpl');
const databasemanager = require(path.join(__dirname,'../tools/databasemanager.js'));

module.exports.getStudentListPage = (req,res) => {
    //代表当前页
    const currentPageIndex = parseInt(req.query.currentPageIndex || '0');
    //每一页的条数
    const everyPageCount = parseInt(req.query.everyPageCount || '2');
    //跳过的条数
    const skip = currentPageIndex * everyPageCount;

    //c查询关键字
    const keyword = req.query.keyword || '';

    //获取分页的相关数据
    databasemanager.getCount('studentInfo',{name:{$regex:keyword}},(err,count)=>{
       //计算总页数
        const totalPage = count % everyPageCount == 0 ? count / everyPageCount :parseInt(count / everyPageCount) +1;
        const totalPageArray = [];
        for(let i = 0;i < totalPage;i++){
            totalPageArray.push(i);
        }
        //查询每一页学生列表数据并渲染在页面上
        databasemanager.findMany('studentInfo',{name:{$regex:keyword}},skip,everyPageCount,(err,docs)=>{

            xtpl.renderFile(path.join(__dirname,'../views/list.html'),{
                array:docs,
                totalPageArray:totalPageArray,
                currentPageIndex:currentPageIndex,
                totalPage:totalPage,
                keyword:keyword,
                username:req.session.username
                },(err,content) => {
                if(err){
                    console.log(err);
                }
                res.setHeader("Content-Type","text/html;charset=utf8");
                res.end(content);
            })
        });
    });
}

//获取新增页面
module.exports.getAddPage = (req,res)=>{
    xtpl.renderFile(path.join(__dirname,"../views/add.html"),{username:req.session.username},(err,content)=>{
        res.setHeader("Content-Type","text/html;charset=utf8");
        res.end(content);
    })
}
//新增学生信息
exports.addStudent = (req,res)=>{
    const params = {
        name:req.body.name,
        age:parseInt(req.body.age),
        sex:req.body.sex,
        phone:req.body.phone,
        address:req.body.address,
        introduction:req.body.introduction
    }
    //调用databasemanager，将我们的信息保存到数据库
    databasemanager.insertOne('studentInfo',params,(err,doc)=>{
        if (doc!=null) {
            res.end("<script>window.location.href='/studentmanager/list?everyPageCount=2&currentPageIndex=0'</script>");
        }else{
            res.end("<script>alert('新增失败');</script>")
        }
    })
}

//获取修改的页面(带数据)
exports.getEditPage = (req,res)=>{
    //获取要修改的文档的Id
    const studentId = req.params.studentId;

    databasemanager.findOne('studentInfo',{_id:databasemanager.ObjectId(studentId)},(err,doc)=>{
        xtpl.renderFile(path.join(__dirname,"../views/edit.html"),{studentInfo:doc,username:req.session.username},(err,content)=>{
            res.setHeader("Content-Type","text/html;charset=utf8");
            res.end(content);
        })
    })
}


//修改学生信息
exports.editStudent = (req,res)=>{
    //要修改的学生Id
    const studentId = req.params.studentId;

    //参数
    const params = {
        name:req.body.name,
        age:parseInt(req.body.age),
        sex:req.body.sex,
        phone:req.body.phone,
        address:req.body.address,
        introduction:req.body.introduction
    }

    //调用修改一个的方法
    databasemanager.updateOne('studentInfo',{_id:databasemanager.ObjectId(studentId)},params,(err,doc)=>{
        if (doc!=null) {
            res.end("<script>window.location.href='/studentmanager/list?everyPageCount=2&currentPageIndex=0'</script>");
        }else{
            res.end("<script>alert('修改失败');</script>")
        }
    })
}


//删除学生信息
exports.deleteStudent = (req,res)=>{
    //获取到要删除学生的id
    const studentId = req.params.studentId;

    const result = {status:1,message:"删除成功"}

    databasemanager.deleteOne('studentInfo',{_id:databasemanager.ObjectId(studentId)},(err,doc)=>{
        if (doc==null) {
            result.status=0;
            result.message="删除失败";
        }

        //原生js
        //res.end(JSON.stringify(result))
        res.json(result)
    })
}
