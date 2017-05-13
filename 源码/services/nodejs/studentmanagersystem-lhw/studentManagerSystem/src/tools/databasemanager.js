/**
 *面向mongodb及控制器写代码
 * 
 */

//导入数据库相关包
const Mongodb =  require('mongodb');
const MongoClient = Mongodb.MongoClient;

const ObjectId = Mongodb.ObjectID;
exports.ObjectId = ObjectId

var url = 'mongodb://localhost:27017/people';

const getDB = (callback) =>{
    MongoClient.connect(url,(err,db)=>{
        if(err){
            console.log(err);
        }
        callback(err,db);
    });
}
//查找单个数据
module.exports.findOne = (collectionName,collectionCondition,callback) => {
    getDB((err,db)=>{
        db.collection(collectionName).findOne(collectionCondition,(err,doc)=>{
            if(err){
                console.log(err);
            }
            callback(err,doc);

            db.close();
        })
    });
}

//查找多条数据
//查询多个的公用方法
module.exports.findMany = (collectionName,collectionCondition,skipCount,everyPageCount,callback)=>{
    //1.获取到db对象
    getDB((err,db)=>{
        db.collection(collectionName).find(collectionCondition).skip(skipCount).limit(everyPageCount).toArray((err,docs)=>{
            if (err) {
                console.log(err);
            }
            callback(err,docs);
            db.close();
        })
    })
}

//查询符合条件的总个数
module.exports.getCount = (collectionName,collectionCondition,callback)=>{
    //1.获取到db对象
    getDB((err,db)=>{
        db.collection(collectionName).count(collectionCondition,(err,count)=>{
            if (err) {
                console.log(err);
            }
            callback(err,count);

            db.close();
        })
    })
}
//插入一条数据
module.exports.insertOne = (collectionName,collectionCondition,callback) => {
    getDB((err,db)=>{
        db.collection(collectionName).insertOne(collectionCondition,(err,doc)=>{
            if(err){
                console.log(err);
            }
            callback(err,doc);
        });
        db.close();
    });
}


//修改一条文档
exports.updateOne = (collectionName,collectionCondition,collectionData,callback)=>{
    //1.获取到db对象
    getDB((err,db)=>{
        db.collection(collectionName).updateOne(collectionCondition,{ $set: collectionData },(err,doc)=>{
            if (err) {
                console.log(err)
            }

            callback(err,doc);

            db.close();
        })
    })
}

//删除一条文档
exports.deleteOne = (collectionName,collectionCondition,callback)=>{
    //1.获取到db对象
    getDB((err,db)=>{
        db.collection(collectionName).deleteOne(collectionCondition,(err,doc)=>{
            if (err) {
                console.log(err)
            }

            callback(err,doc);

            //关闭数据库
            db.close();
        })
    })
}
