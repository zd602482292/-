const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    questionList: [{
        title: '问题1？',
        items: [{
            id: 1,
            value: '是'
          },
          {
            id: 2,
            value: '否'
          }
        ]
      },
      {
        title: '问题2？',
        items: [{
            id: 1,
            value: '是'
          },
          {
            id: 2,
            value: '否'
          }
        ]
      },
      {
        title: '问题3？',
        items: [{
            id: 1,
            value: '是'
          },
          {
            id: 2,
            value: '否'
          }
        ]
      },
      {
        title: '问题4？',
        items: [{
            id: 1,
            value: '是'
          },
          {
            id: 2,
            value: '否'
          }
        ]
      },
      {
        title: '问题5？',
        items: [{
            id: 1,
            value: '是'
          },
          {
            id: 2,
            value: '否'
          }
        ]
      },
      {
        title: '问题6？',
        items: [{
            id: 1,
            value: '是'
          },
          {
            id: 2,
            value: '否'
          }
        ]
      },
    ],
    textareaValue: '',
    result: {
      questionnaire1: '',
      questionnaire2: '',
      questionnaire3: '',
      questionnaire4: '',
      questionnaire5: '',
      questionnaire6: '',
    },
  },
  textareaInput: function (e) {
    this.setData({
      textareaValue: e.detail.value,
    })

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
  radioChange: function (e) {

    let index = e.currentTarget.dataset.index;
    let resultValue = 'result.questionnaire' + index;
    this.setData({
      [resultValue]: e.detail.value
    })
  },
  submit: function () {
    let openid = app.globalData.openid;
    let parems = this.data.result;
    let date = this.data.date;
    if (parems.questionnaire1 == '') {
      wx.showToast({
        title: '请回答第1题',
        icon: 'none'
      })
    } else if (parems.questionnaire2 == '') {
      wx.showToast({
        title: '请回答第2题',
        icon: 'none'
      })
    } else if (parems.questionnaire3 == '') {
      wx.showToast({
        title: '请回答第3题',
        icon: 'none'
      })
    } else if (parems.questionnaire4 == '') {
      wx.showToast({
        title: '请回答第4题',
        icon: 'none'
      })
    } else if (parems.questionnaire5 == '') {
      wx.showToast({
        title: '请回答第5题',
        icon: 'none'
      })
    } else if (parems.questionnaire6 == '') {
      wx.showToast({
        title: '请回答第6题',
        icon: 'none'
      })
    } else if (this.data.date == '') {
      wx.showToast({
        title: '请选择日期',
        icon: 'none'
      })
    } else {
      wx.cloud.callFunction({
        name: 'wenjuanget',
        data: {
          openid
        },
        success: res => {
          console.log('获取问卷openid', res)
          if (res.result.data.length != 0) {
            wx.cloud.callFunction({
              name: 'wenjuanupd',
              data: {
                openid,
                parems,
                date
              },
              success: ress => {
                console.log('问卷信息更新成功: ', ress)
              },
              fail: ress => {
                console.log('问卷信息更新失败: ', ress)
              }
            })
          } else {
            wx.cloud.callFunction({
              name: 'wenjuanadd',
              data: {
                openid,
                parems,
                date
              },
              success: ress => {
                console.log('添加新问卷信息: ', ress)
              },
              fail: ress => {
                console.log('添加新问卷信息失败: ', ress)
              }
            })
          }
        },
        fail: res => {
          console.log('获取问卷openid失败', res)
        }

      })



      wx.reLaunch({
        url: '/pages/QRcode/QRcode',
      })
    }
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

})