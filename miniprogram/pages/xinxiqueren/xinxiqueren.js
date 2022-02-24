const app= getApp()
var util=require('../../utils/time.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        jcryname:null,
        jcrysex:null,
        jcryidcard:null,
        jcryphonenum:null,
        jcrybarcode:null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            jcryname: app.globalData.jcryname,
            jcrysex: app.globalData.jcrysex,
            jcryidcard: app.globalData.jcryidcard,
            jcryphonenum: app.globalData.jcryphonenum,
            jcrybarcode:app.globalData.jcrybarcode
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    confirm:function () 
    {
        wx.showLoading({
            title: '上传中...',
          })
        let barcode = app.globalData.jcrybarcode
        let jcryname = app.globalData.jcryname
        let jcrysex = app.globalData.jcrysex
        let jcryidcard = app.globalData.jcryidcard
        let jcryphonenum = app.globalData.jcryphonenum
        let time = util.formatTime(new Date())
        wx.cloud.callFunction({
            name: 'jcjladd',
            data: {
                barcode,
                jcryname,
                jcryidcard,
                jcrysex,
                jcryphonenum,
                time
            },
            success: res => {
                console.log('检测记录入库成功',res)
               
                wx.hideLoading({
                })
                wx.showToast({
                    title: '上传成功',
                    icon:'success'
                  })
                  setTimeout(function () {
                wx.navigateBack({
                })
            },500)

            },
            fail:res=>{
                console.log('检测记录入库失败',res)
                wx.hideLoading({
                })
                wx.showToast({
                  title: '上传失败',
                  icon:'error'
                })
              }
        })
    }
})