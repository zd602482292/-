const app = getApp()
const db = wx.cloud.database();
const _ = db.command;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    questionList: [],
    textareaValue: '',
    result: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    //读取问卷题库数据，获取问题
    db.collection('tiku').get({
      success: res => {
        console.log(res)
        var num = 0
        num = res.data[0].tiku1.length
        var array = new Array(num).fill('')
        var List = []
        for (var i = 0; i < num; i++) {
          List[i] = {
            title: res.data[0].tiku1[i],
            items: [{
                id: 1,
                value: '是'
              },
              {
                id: 2,
                value: '否'
              }
            ]
          }
        }
        this.setData({
          questionList: List,
          result: array
        })
        console.log(this.data.questionList)
        wx.hideLoading({})
      },
      fail: e => {
        wx.hideLoading({})
        console.log(e)
      }
    })
  },

  //单选框
  radioChange: function (e) {

    let index = e.currentTarget.dataset.index - 1;
    let resultValue = 'result[' + index + ']';
    this.setData({
      [resultValue]: e.detail.value
    })
    console.log(this.data.result)
  },
  //提交问卷按钮
  submit: function () {
    let openid = app.globalData.openid;
    let name = app.globalData.name;
    let parems = this.data.result;
    let date = this.data.date;
    //判断是否已全部填写
    if (parems.indexOf('') != -1) {
      wx.showToast({
        title: '请回答完问题',
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
                name,
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
                name,
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
  //选择提交日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

})