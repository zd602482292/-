// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
   return await db.collection('user').add({
       data:{
        openid:event.openid,
        name:event.name,
        phonenum:event.phonenum,
        idcardnum:event.idcardnum,
        sex:event.sex
       }
   })
}