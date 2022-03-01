const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginuser: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    let openid = app.globalData.openid;
    this.setData({
        loginuser: app.globalData.loginUser
      }),
      wx.cloud.callFunction({
        name: 'userget',
        data: {
          openid
        },
        success: res => {
          console.log('获取用户已有信息', res.result)
          if (res.result.data.length != 0) {
            if (res.result.data[0].QRCode) {
              console.log('读取到已有检测二维码')
              app.globalData.QRcode = true
              app.globalData.idcardnum = res.result.data[0].idcardnum
            }
          }
          wx.hideLoading({})
        },
        fail: e => {
          console.log(e)
          wx.hideLoading({})
        }
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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

  jcsq: function () {
    if (app.globalData.QRcode == true) {
      wx.showModal({
        title: '提示',
        content: '已有检测码，是否重新进行检测申请',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/smrz/smrz',
            })
          }
        }
      })
    } else if (app.globalData.QRcode == false) {
      wx.navigateTo({
        url: '/pages/smrz/smrz',
      })
    }

  },

  QRcode: function () {
    if (app.globalData.QRcode == true) {
      wx.navigateTo({
        url: '/pages/QRcode/QRcode',
      })
    } else if (app.globalData.QRcode == false) {
      wx.showToast({
        title: '请先申请检测',
        icon: 'error'
      })
    }

  },

  jcjl: function () {
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/jcjl/jcjl',
      })
    }, 50)

  }







})