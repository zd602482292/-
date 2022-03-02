const app = getApp()
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user')
    if(user!="")
    {
    app.globalData.loginUser=user
    }
    console.log('用户信息为:',app.globalData.loginUser)
    //获取用户openid
    wx.cloud.callFunction({
      name:'getopenid',
      complete:res=>{
        app.globalData.openid=res.result.openId;
        console.log('用户的openid为:',app.globalData.openid)
      }
    })
    //获取banner数据库信息
    db.collection('banner').get({
      success: res => {
          console.log(res)
          var a=[]
          var num=res.data.length
          for(var i=0;i<num;i++)
          {
            a[i]=res.data[i]
          }
          this.setData({
            banner:a
          })
      }
    })
  },

  //检测人员登录
  login1: function (param) {
    //用户授权微信信息
    if(app.globalData.loginUser==null){
    wx.getUserProfile({
      desc: '用于信息完善',
      success(res) {
        console.log(res.userInfo)
        app.globalData.loginUser = res.userInfo
        wx.setStorageSync('user', app.globalData.loginUser)
        wx.navigateTo({
          url: '/pages/login1/login1',
        })
      }
    })
  }
  else{
    wx.navigateTo({
      url: '/pages/login1/login1',
    })
  }
  },

  //医护人员登录
  login2: function (param) {
    wx.navigateTo({
      url: '/pages/login2/login2',
    })
  },

  //点击banner获取bannerid，用于读取页面具体信息
  onclick: function (e) {
    console.log(e.currentTarget.dataset.text);
    app.globalData.xinwenid=e.currentTarget.dataset.text;
}
})