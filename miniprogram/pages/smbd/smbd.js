const app= getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        jcryname:null,
        jcrysex:null,
        jcryidcard:null,
        jcryphonenum:null

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
        jcryname:app.globalData.jcryname,
        jcrysex:app.globalData.jcrysex,
        jcryidcard:app.globalData.jcryidcard,
        jcryphonenum:app.globalData.jcryphonenum
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

    barcode:function () {
        wx.scanCode({
                    scanType:['barCode'],
                    success (res) {
                        console.log(res)
                        wx.showToast({
                          title: '扫描成功',
                        })


                        wx.navigateBack({
                        })
                      }
                })
    }
})