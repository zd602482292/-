const app = getApp()
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    currentData: 0,
    jcjl: "",
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
  },

  //获取输入内容
  input: function (data) {
    this.setData({
      content: data.detail.value
    })
  },

  //搜索按钮
  search: function () {
    let c = this.data.content;
    console.log(c)
    //根据输入内容筛选数据库中检测记录
    db.collection('jcjl').orderBy('time', 'desc')
      .where(_.or([{
          name: db.RegExp({ //使用正则查询，实现对搜索的模糊查询
            regexp: c,
            options: 'i', //大小写不区分
          }),
        },
        {
          time: db.RegExp({
            regexp: c,
            options: 'i',
          }),
        },
        {
          idcardnum: db.RegExp({
            regexp: c,
            options: 'i',
          }),
        },
        {
          phonenum: db.RegExp({
            regexp: c,
            options: 'i',
          }),
        },
        {
          barcode: db.RegExp({
            regexp: c,
            options: 'i',
          }),
        }
      ])).get()
      .then(res => {
        console.log('查询成功', res)
        this.setData({
          jcjl: res.data
        })
      })
      .catch(res => {
        console.log('查询失败', res)
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