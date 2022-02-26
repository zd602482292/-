const app = getApp()
const db = wx.cloud.database();
const _ = db.command;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content:"",
        currentData : 0,
        jcjl:"",
        windowHeight:""

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.getSystemInfo({
        success: (res) => {
          let windowHeight = res.windowHeight
       
          this.setData({
            windowHeight: windowHeight
          })
        }
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

    input: function (data) {
        this.setData({
        content: data.detail.value
        })
      },
    
    search:function () {
        let c=this.data.content;
        console.log(c)
        db.collection('jcjl').orderBy('time','desc')
      .where(_.or([
        {
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
            jcjl:res.data
        })
      })
      .catch(res => {
        console.log('查询失败', res)
      })
    },

    bindchange:function(e){
        const that  = this;
        that.setData({
          currentData: e.detail.current
        })
      },
      //点击切换，滑块index赋值
      checkCurrent:function(e){
        const that = this;
     
        if (that.data.currentData === e.target.dataset.current){
            return false;
        }else{
     
          that.setData({
            currentData: e.target.dataset.current
          })
        }
      }
})