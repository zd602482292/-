const app = getApp()
const db = wx.cloud.database();
const _ = db.command;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        yxzl:""

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
         //根据获取的id生成具体内容
        db.collection('yxzl').where({
            _id:app.globalData.xinwenid
        }).get().then(res => {
            console.log('查询成功', res)
            this.setData({
                yxzl:res.data[0]
            })
          }).catch(res => {
            console.log('查询失败', res)
          })

    }
})