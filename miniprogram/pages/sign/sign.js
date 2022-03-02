const app = getApp()
Page({
  data: {
    context1: null,
    hasDraw: false,
    src: null,
    Img: null
  },
  onLoad: function () {
    //生成签名花瓣
    var context1 = wx.createCanvasContext('handWriting1');
    context1.setStrokeStyle("#000000")
    context1.setLineWidth(3);
    this.setData({
      context1: context1,
    })
  },
  //根据触碰生成轨迹开端
  touchstart1: function (e) {
    var context1 = this.data.context1;
    context1.moveTo(e.touches[0].x, e.touches[0].y);
    this.setData({
      context1: context1,
      hasDraw: true,
    });
  },
  //根据触碰过程生成轨迹
  touchmove1: function (e) {
    var x = e.touches[0].x;
    var y = e.touches[0].y;
    var context1 = this.data.context1;
    context1.setLineWidth(3);
    context1.lineTo(x, y);
    context1.stroke();
    context1.setLineCap('round');
    context1.draw(true);
    context1.moveTo(x, y);
  },
  //重新签名按钮，清空签名画板
  reSign1: function () { //重新签名
    var that = this;
    var context1 = that.data.context1;
    context1.draw(); //清空画布
    that.setData({
      hasDraw: false, //没有签名
      src: null
    });
  },
  //确认签名成功
  sign1ok: function () {
    var that = this;
    if (!that.data.hasDraw) {
      console.log("还没有签名")
      wx.showToast({
        title: '还未完成签名',
        icon: 'error'
      })
    } else {
      var context1 = that.data.context1;
      context1.draw(true, wx.canvasToTempFilePath({
        canvasId: 'handWriting1',
        success(res) {
          console.log('签名临时路径:', res.tempFilePath)
          let filePath = res.tempFilePath;
          //将签名图存取到云存储
          const name = Math.random() * 1000000;
          const cloudPath = 'sign/' + name + filePath.match(/\.[^.]+?$/)
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: ress => {
              console.log('签名上传成功', ress)
              that.setData({
                Img: ress.fileID
              });
              let openid = app.globalData.openid;
              let fileID = ress.fileID;
              //将签名云存储路径存储到用户数据库
              wx.cloud.callFunction({
                name: 'updatesign',
                data: {
                  openid,
                  fileID
                },
                success: result => {
                  console.log('更新签名成功: ', result)
                },
                fail: result => {
                  console.log('更新签名失败: ', result)
                }
              })
            },
            fail: ress => {
              console.log('签名上传失败: ', ress)
            }
          })
          that.setData({
            src: res.tempFilePath
          })
          app.globalData.signsrc = that.data.src;
          console.log('签名保存地址:', app.globalData.signsrc)
          wx.navigateBack()
        }
      }))
    }
  },
});