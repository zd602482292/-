const app = getApp()
const db = wx.cloud.database();
const _ = db.command;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content:'',
        yxzl:[],
        bottom:null
    },
     //读取医学资料列表数据库，初始状态读取11个，上拉触底读取更多
    getData(num=11,page=0){
      wx.showLoading({
        title: '加载中...',
      })
      db.collection('yxzl').orderBy('time','desc').skip(page).limit(num)
      .where(
        {
            title: db.RegExp({ //使用正则查询，实现对搜索的模糊查询
            regexp: this.data.content,
            options: 'i', //大小写不区分
          }),
        },
      ).get()
      .then(res => {
        console.log("查询成功",res)
        var oldData=this.data.yxzl
        var newData=oldData.concat(res.data);
        this.setData({
            yxzl:newData,
          bottom:res.data.length
       })
       wx.hideLoading({
       })
     })
     .catch(res => {
       console.log('查询失败', res)
     })

      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      //初始页面默认读取列表
      this.getData()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      //上拉触底读取更多
     var page=this.data.yxzl.length
      this.getData(5,page)
    },

    //获取输入信息用于搜索
    input: function (data) {
        this.setData({
        content: data.detail.value
        })
      },
      //搜索按钮
    search:function () {
      this.setData({
        yxzl:[]
      })
      var that=this
      setTimeout(function () {
        that.getData()
      },300)
    },
     //点击存取相应id已生成具体信息
    onclick: function (e) {
        console.log(e.currentTarget.dataset.text);
        app.globalData.xinwenid=e.currentTarget.dataset.text;
    }
})