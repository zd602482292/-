const app=getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        nameinput:'',
        phonenum:'',
        idcardnum:'',
        sex: [{
            id: 1,
            value: '男'
          }, {
            id: 2,
            value: '女'
          }],
          check:false,

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
        this.setData({
          check: true
         })
      const sex = this.data.sex
      for (let i = 0, len = sex.length; i < len; ++i) {
        sex[i].checked = sex[i].id == e.detail.value
      }
      this.setData({
        sex
      })
      console.log('性别为:',this.data.sex);
    },


    input1:function (data) {
        this.setData({
          nameinput:data.detail.value
        })
      },
    
      input2:function (data) {
        this.setData({
          phonenum:data.detail.value
        })
      },
    
      input3:function (data) {
        this.setData({
          idcardnum:data.detail.value
        })
      },
    
      infoform(res) {
        var {name,phonenum,idcardnum,sex}=res.detail.value;
        var openid=app.globalData.openid;
        if(sex==1)
        {
          sex='男'
        }
        else if(sex==2)
        {
          sex='女'
        }
        if(!this.data.nameinput){
          wx.showToast({
            title: '请填写姓名',
            icon:'none'
          })
        }else if(!this.data.phonenum){
          wx.showToast({
            title: '请填写手机号码',
            icon:'none'
          })
        }else if(!this.data.idcardnum){
          wx.showToast({
            title: '请填写身份证号码',
            icon:'none'
          })
        }else if(this.data.check==false){
          wx.showToast({
            title: '请选择性别',
            icon:'none'
          })
        }
        else{
        wx.cloud.callFunction({
          name:'userget',
          data:{
            openid
          },
          success:res=>{
            console.log('获取数据库用户信息:',res)
            if(res.result.data.length!=0){
        wx.cloud.callFunction({
          name:'userupd',
          data:{
            openid,name,phonenum,idcardnum,sex
          },
          success: ress => {
            console.log('更新用户信息: ', ress)
          },
          fail: ress => {
            console.log('更新用户信息失败: ', ress)
          }
        })
      }
       
        else{
          wx.cloud.callFunction({
            name:'useradd',
            data:{
              openid,name,phonenum,idcardnum,sex
            },
            success: ress => {
              console.log('添加新用户信息: ', ress)
            },
            fail: ress => {
              console.log('添加新用户信息失败: ', ress)
            }
          })
        }
      },
      fail:res=>{
        console.log('获取数据库用户信息失败:',res)
      }
      })
      app.globalData.name=this.data.nameinput;
        wx.navigateTo({
          url: '/pages/zqtys/zqtys',
        })
        console.log('身份认证信息：',this.data);
      }

      },
    
      save:function(){
        /*if(!this.data.nameinput){
          wx.showToast({
            title: '请填写姓名',
            icon:'none'
          })
        }else if(!this.data.phonenum){
          wx.showToast({
            title: '请填写手机号码',
            icon:'none'
          })
        }else if(!this.data.idcardnum){
          wx.showToast({
            title: '请填写身份证号码',
            icon:'none'
          })
        }else if(this.data.check==false){
          wx.showToast({
            title: '请选择性别',
            icon:'none'
          })
        }else{
        app.globalData.name=this.data.nameinput;
        wx.navigateTo({
          url: '/pages/zqtys/zqtys',
        })
      }
      console.log('身份认证信息：',this.data);*/
      }
})