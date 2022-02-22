const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
    src:null,
    check:false

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        if(app.globalData.signsrc!=null)
        {
            this.setData({
                src:app.globalData.signsrc
            })
        }
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

    radiocon:function(e){   
        this.setData({
          check: !this.data.check
         })
        console.log("用户打勾的是 ",this.data.check)
      },  

      save:function(){
          if(this.data.check==true&&this.data.src!=null){
        wx.navigateTo({
          url: '/pages/wjdc/wjdc',
        })
    }
    else{
        wx.showToast({
          title: '请签名并确认!',
          icon:'none',
          duration:1500
        })
      }
    }
})