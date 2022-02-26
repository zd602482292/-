const app= getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        username:'',
        permission:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        username:app.globalData.name,
        permission:app.globalData.permission
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

    smbd:function (){
        wx.scanCode({
            scanType:['qrCode'],
            success (res) {
              wx.showLoading({
                title: '加载中',
              })
                console.log('二维码信息为：',res)
                app.globalData.jcryid=res.result.substring(100,128)
                let openid=app.globalData.jcryid
                console.log(openid)
                wx.cloud.callFunction({
                  name: 'userget',
                  data: {
                    openid
                  },
                   success: ress => {
                    if (ress.result.data.length != 0) {
                    console.log('获取用户已有信息',ress.result)
                    app.globalData.jcryname=ress.result.data[0].name
                    app.globalData.jcrysex=ress.result.data[0].sex
                    app.globalData.jcryidcard=ress.result.data[0].idcardnum
                    app.globalData.jcryphonenum=ress.result.data[0].phonenum
                    console.log(app.globalData)
                    wx.hideLoading({
                    })
                    wx.navigateTo({
                      url: '/pages/smbd/smbd',
                    })
                  }
                  else{
                    wx.hideLoading({
                    })
                    wx.showToast({
                      title: '二维码错误',
                      icon:'error'
                    })
                  }
                },
                fail:ress=>{
                  console.log(ress)
                  wx.hideLoading({
                  })

                }
                })
               
                
                      }
                })
        
      },
  
      sjcx:function () {
        wx.navigateTo({
          url: '/pages/sjcx/sjcx',
        })
      },

      jcjlsc:function () {
        wx.navigateTo({
          url: '/pages/jcjlsc/jcjlsc',
        })
      },

      tmgl:function () {
        wx.navigateTo({
          url: '/pages/tmgl/tmgl',
        })
      },

      zhpz:function () {
        wx.navigateTo({
          url: '/pages/zhpz/zhpz',
        })
      },
})