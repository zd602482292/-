const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        jcryname: null,
        jcrysex: null,
        jcryidcard: null,
        jcryphonenum: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //展示获取的检测用户信息
        this.setData({
            jcryname: app.globalData.jcryname,
            jcrysex: app.globalData.jcrysex,
            jcryidcard: app.globalData.jcryidcard,
            jcryphonenum: app.globalData.jcryphonenum
        })
    },


    //扫描条形码按钮
    barcode: function () {
        //进入扫描页
        wx.scanCode({
            //扫描类型为条形码
            scanType: ['barCode'],
            success(res) {
                console.log(res)
                //当扫描的条形码为CODE_128型时成功
                if (res.scanType == "CODE_128") {
                    app.globalData.jcrybarcode = res.result
                    //扫描成功震动提示
                    wx.vibrateShort({
                        type: 'medium'
                    })
                    wx.redirectTo({
                        url: '/pages/xinxiqueren/xinxiqueren',
                    })
                } else {
                    wx.showToast({
                        title: '扫码失败',
                        icon: 'error'
                    })
                }
            },

            fail(e) {
                wx.showToast({
                    title: '扫码失败',
                    icon: 'error'
                })
                console.log(e)
            }

        })
    }
})