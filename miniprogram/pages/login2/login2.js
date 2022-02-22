Page({

    /**
     * 页面的初始数据
     */
    data: {
        user:'',
        password:'',

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
    input1:function (data) {
        this.setData({
            user:data.detail.value
        })
      },
    
      input2:function (data) {
        this.setData({
          password:data.detail.value
        })
      },

      login:function(){
        if(!this.data.user){
          wx.showToast({
            title: '请输入账号',
            icon:'none'
          })
        }else if(!this.data.password){
          wx.showToast({
            title: '请输入密码',
            icon:'none'
          })
        }else{
        wx.navigateTo({
          url: '/pages/managestm/managestm',
        })
      }
      console.log(this.data);
      }

})