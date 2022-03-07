// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    return await db.collection('jcjl').add({
        data:{
         name:event.jcryname,
         phonenum:event.jcryphonenum,
         idcardnum:event.jcryidcard,
         sex:event.jcrysex,
         barcode:event.barcode,
         time:event.time,
         complete:event.complete,
         age:event.age
        }
    })
}