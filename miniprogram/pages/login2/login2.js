const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    password: '',


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
  input1: function (data) {
    this.setData({
      user: data.detail.value
    })
  },

  input2: function (data) {
    this.setData({
      password: data.detail.value
    })

  },

  login: function () {
    wx.showLoading({
      title: '登录中...',
    })
    let that=this
    setTimeout(function () {
    if (that.data.user == '') {
      wx.hideLoading({
               
      })
      wx.showToast({
        title: '请输入账号',
        icon: 'none'
      })
    } else if (that.data.password == '') {
      wx.hideLoading({
               
      })
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      
    } else {
      let account = that.data.user
      let password = that.data.password
      wx.cloud.callFunction({
        name: 'getpwd',
        data: {
          account,
        },
        success: res => {
          console.log('连接数据库成功: ', res)
          if (res.result.data.length != 0) {
            if (password != res.result.data[0].password) {
              wx.hideLoading({
               
              })
              wx.showToast({
                title: '密码输入错误',
                icon: 'none'
              })
              
            } else if (password == res.result.data[0].password) {
              app.globalData.name = res.result.data[0].name
              app.globalData.permission = res.result.data[0].permission
              wx.hideLoading({
               
              })
              console.log(app.globalData.permission)
              wx.redirectTo({
                url: '/pages/managestm/managestm',
              })
            }
          } else if (res.result.data.length == 0) {
            wx.hideLoading({
               
            })
            wx.showToast({
              
              title: '账号输入错误',
              icon: 'none'
            })

          }
        },
        fail: res => {
          console.log('连接数据库失败: ', res)
        }
      })
    }
    console.log(that.data);
  },100)
  }

})