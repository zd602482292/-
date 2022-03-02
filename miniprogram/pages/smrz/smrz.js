const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameinput: '',
    phonenum: '',
    idcardnum: '',
    sex: [{
      id: 1,
      value: '男'
    }, {
      id: 2,
      value: '女'
    }],
    check: false,

  },

  //性别选择判定
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
    console.log('性别为:', this.data.sex);
  },


  //姓名输入
  input1: function (data) {
    this.setData({
      nameinput: data.detail.value
    })
  },

  //手机号码输入
  input2: function (data) {
    this.setData({
      phonenum: data.detail.value
    })
  },

  //身份证号输入
  input3: function (data) {
    this.setData({
      idcardnum: data.detail.value
    })
  },

  //信息form按钮提交
  infoform(res) {
    var {
      name,
      phonenum,
      idcardnum,
      sex
    } = res.detail.value;
    var openid = app.globalData.openid;
    if (sex == 1) {
      sex = '男'
    } else if (sex == 2) {
      sex = '女'
    }
    let that = this
    setTimeout(function () {
      //判定输入项是否为空
      if (!that.data.nameinput) {
        wx.showToast({
          title: '请填写姓名',
          icon: 'none'
        })
      } else if (!that.data.phonenum) {
        wx.showToast({
          title: '请填写手机号码',
          icon: 'none'
        })
      } else if (!that.data.idcardnum) {
        wx.showToast({
          title: '请填写身份证号',
          icon: 'none'
        })
      } else if (that.data.check == false) {
        wx.showToast({
          title: '请选择性别',
          icon: 'none'
        })
      } else {
        //读取信息输入库，如已有身份信息则更新；如未有身份信息则添加新信息
        wx.cloud.callFunction({
          name: 'userget',
          data: {
            openid
          },
          success: res => {
            console.log('获取数据库用户信息:', res)
            if (res.result.data.length != 0) {
              wx.cloud.callFunction({
                name: 'userupd',
                data: {
                  openid,
                  name,
                  phonenum,
                  idcardnum,
                  sex
                },
                success: ress => {
                  console.log('更新用户信息: ', ress)
                },
                fail: ress => {
                  console.log('更新用户信息失败: ', ress)
                }
              })
            } else {
              wx.cloud.callFunction({
                name: 'useradd',
                data: {
                  openid,
                  name,
                  phonenum,
                  idcardnum,
                  sex
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
          fail: res => {
            console.log('获取数据库用户信息失败:', res)
          }
        })
        app.globalData.name = that.data.nameinput;
        wx.navigateTo({
          url: '/pages/zqtys/zqtys',
        })
        console.log('身份认证信息：', that.data);
      }
    }, 100)

  }
})