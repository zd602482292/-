const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: null,
    check: false

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //如已签名，则在签名栏显示签名
    if (app.globalData.signsrc != null) {
      this.setData({
        src: app.globalData.signsrc
      })
    }
  },

  //知情同意书确认同意框
  radiocon: function (e) {
    this.setData({
      check: !this.data.check
    })
    console.log("用户打勾的是 ", this.data.check)
  },

  //保存按钮
  save: function () {
    //检测是否已签名及勾选同意框
    if (this.data.check == true && this.data.src != null) {
      wx.navigateTo({
        url: '/pages/wjdc/wjdc',
      })
    } else {
      wx.showToast({
        title: '请签名并确认!',
        icon: 'none',
        duration: 1500
      })
    }
  }
})