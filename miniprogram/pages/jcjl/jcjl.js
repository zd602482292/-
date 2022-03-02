const app = getApp()
const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    jcjl: "",
    currentData: 0,
    windowHeight: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户屏幕高度
    wx.getSystemInfo({
      success: (res) => {
        let windowHeight = res.windowHeight

        this.setData({
          windowHeight: windowHeight
        })
      }
    })
    //根据身份证号读取用户数据库中检测记录
    let idcardnum = app.globalData.idcardnum
    db.collection('jcjl').orderBy('time', 'desc').where({
      idcardnum: idcardnum
    }).get({
      success: res => {
        console.log(res)
        this.setData({
          jcjl: res.data
        })
        console.log(this.data.jcjl)
      }
    })

  },

  //切换检测完成/检测中状态页
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },

  //点击查看详情时，获取点击项的条码号barcode，用以生成具体信息
  onclick: function (e) {
    console.log(e.currentTarget.dataset.text);
    app.globalData.reportbarcode = e.currentTarget.dataset.text;
  }
})