// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
   return await db.collection('wenjuan').add({
       data:{
        openid:event.openid,
        question1:event.parems.questionnaire1,
        question2:event.parems.questionnaire2,
        question3:event.parems.questionnaire3,
        question4:event.parems.questionnaire4,
        question5:event.parems.questionnaire5,
        question6:event.parems.questionnaire6,
        date:event.date
       }
   })
}