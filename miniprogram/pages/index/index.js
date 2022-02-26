const app = getApp()
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('初始用户信息:',app.globalData.loginUser)
    let user = wx.getStorageSync('user')
    if(user!="")
    {
    app.globalData.loginUser=user
    }
    console.log('用户信息为:',app.globalData.loginUser)
    wx.cloud.callFunction({
      name:'getopenid',
      complete:res=>{
        app.globalData.openid=res.result.openId;
        console.log('用户的openid为:',app.globalData.openid)
      }
    })
    db.collection('banner').get({
      success: res => {
          console.log(res)
          var a=[]
          var num=res.data.length
          for(var i=0;i<num;i++)
          {
            a[i]=res.data[i].banner
          }
          this.setData({
            banner:a
          })
      }
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

  login1: function (param) {
    if(app.globalData.loginUser==null){
    wx.getUserProfile({
      desc: '用于信息完善',
      success(res) {
        console.log(res.userInfo)
        app.globalData.loginUser = res.userInfo
        wx.setStorageSync('user', app.globalData.loginUser)
        wx.navigateTo({
          url: '/pages/login1/login1',
        })
      }
    })
  }
  else{
    wx.navigateTo({
      url: '/pages/login1/login1',
    })
  }
  },

  login2: function (param) {
    wx.navigateTo({
      url: '/pages/login2/login2',
    })
  }
})