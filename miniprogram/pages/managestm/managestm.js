const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    permission: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //读取账号的姓名及权限
    this.setData({
      username: app.globalData.name,
      permission: app.globalData.permission
    })
  },

  //扫码绑定按钮
  smbd: function () {
    //点击调取扫描页
    wx.scanCode({
      //扫描类型为二维码
      scanType: ['qrCode'],
      success(res) {
        wx.showLoading({
          title: '加载中',
        })
        console.log('二维码信息为：', res)
        //根据二维码信息读取其中100-128位的openid
        app.globalData.jcryid = res.result.substring(100, 128)
        let openid = app.globalData.jcryid
        console.log(openid)
        //根据openid读取数据库中用户信息
        wx.cloud.callFunction({
          name: 'userget',
          data: {
            openid
          },
          success: ress => {
            if (ress.result.data.length != 0) {
              console.log('获取用户已有信息', ress.result)
              app.globalData.jcryname = ress.result.data[0].name
              app.globalData.jcrysex = ress.result.data[0].sex
              app.globalData.jcryidcard = ress.result.data[0].idcardnum
              app.globalData.jcryphonenum = ress.result.data[0].phonenum
              console.log(app.globalData)
              wx.hideLoading({})
              //读取成功跳转扫描条形码页面
              wx.navigateTo({
                url: '/pages/smbd/smbd',
              })
            } else {
              wx.hideLoading({})
              wx.showToast({
                title: '二维码错误',
                icon: 'error'
              })
            }
          },
          fail: ress => {
            console.log(ress)
            wx.hideLoading({})

          }
        })


      }
    })

  },

  //点击检测数据查询跳转数据查询页面
  sjcx: function () {
    wx.navigateTo({
      url: '/pages/sjcx/sjcx',
    })
  },

})