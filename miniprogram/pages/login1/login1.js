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
    //根据openid读取用户信息，检测是否已经生成二维码
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
              app.globalData.signsrc = res.result.data[0].sign
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

  //检测申请按钮
  jcsq: function () {
    //如果已生成二维码，点击检测申请弹出提示；如果未生成则直接跳转检测申请的实名认证页面
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
  //我的检测码按钮
  QRcode: function () {
    //如果已有检测码，点击按钮直接跳转检测码页面；如果未有检测码，则不跳转并提示先申请检测
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
  //检测记录按钮
  jcjl: function () {
    //跳转检测记录页面
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/jcjl/jcjl',
      })
    }, 50)

  }


})