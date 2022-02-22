// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    return await db.collection('user').where({
        openid:event.openid
    }).update({
        data:{
        name:event.name,
        idcardnum:event.idcardnum,
        phonenum:event.phonenum,
        sex:event.sex
    }})
}