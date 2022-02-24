import{
    barc
}from '../../utils/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        code: [],
        num:0
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

    input: function (data) {
        this.setData({
          num: data.detail.value
        })
      },

    randomWord: function () {

        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        var nums = "";

        for (var i = 0; i < 16; i++) {

            var id = parseInt(Math.random() * 10);

            nums += chars[id];

        }

        return nums;

    },

    confirm:function () {
        var num=this.data.num
        var c=[];
        for(var i=0;i<num;i++){
            c.push(this.randomWord());
        }
        this.setData({
            code:c
        })
        console.log(this.data.code)
        for (var i in c){
        barc('barcode'+i,c[i],600,100)
        }
        
    }
})