const app = getApp()
const db = wx.cloud.database();
const _ = db.command;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        gonggao:""

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //根据获取的公告id生成具体公告内容
        db.collection('announcement').where({
            _id:app.globalData.xinwenid
        }).get().then(res => {
            console.log('查询成功', res)
            this.setData({
                gonggao:res.data[0]
            })
          }).catch(res => {
            console.log('查询失败', res)
          })

    }


})