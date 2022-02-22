import drawQrcode from '../../utils/weapp.qrcode.esm.js'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        src: '',
        Img: '',
        Brightness: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        var openid = app.globalData.openid;
        this.setData({
            src: app.globalData.QRcodesrc
        })
        let that = this;
        wx.cloud.callFunction({
            name: 'userget',
            data: {
                openid
            },
            success: res => {
                console.log('获取姓名成功：', res.result.data[0].name);
                that.setData({
                    name: res.result.data[0].name
                })
            },
            fail: res => {
                console.log('获取姓名失败：', res.result.data[0].name);
            }
        })
        
        wx.showLoading({
            title: '二维码加载中'
        })
        const query = wx.createSelectorQuery()
        query.select('#Qrcode')
            .fields({
                node: true,
                size: true
            })
            .exec((res) => {
                var x = this.randomWord();
                var y = this.randomWord();
                var canvas = res[0].node;

                var img = canvas.createImage();
                img.src = "/images/logo.png"
                img.onload = function () {
                    // img.onload完成后才能调用 drawQrcode方法
                    var options = {
                        canvas: canvas,
                        canvasId: 'Qrcode',
                        width: 275,
                        padding: 10,
                        background: '#ffffff',
                        foreground: '#000000',
                        text: x + openid + y + 'weimeiyiliaotuoyecaijixiaochengxu',
                        image: {
                            imageResource: img,
                            width: 40, // 建议不要设置过大，以免影响扫码
                            height: 40, // 建议不要设置过大，以免影响扫码
                            round: true // Logo图片是否为圆形
                        }
                    }
                    drawQrcode(options)
                    // 获取临时路径（得到之后，想干嘛就干嘛了）
                    wx.canvasToTempFilePath({
                        canvasId: 'Qrcode',
                        canvas: canvas,
                        x: 0,
                        y: 0,
                        width: 550,
                        height: 550,
                        //destWidth: 550,
                        //destHeight: 550,
                        success(res) {
                            wx.hideLoading({})
                            console.log('二维码临时路径：', res.tempFilePath)
                            let qrcode = true;
                            wx.cloud.callFunction({
                                name: 'updateQRCode',
                                data: {
                                    openid,
                                    qrcode
                                },
                                success: result => {
                                    console.log('二维码入库成功: ', result)

                                },
                                fail: result => {
                                    console.log('二维码入库失败: ', result)
                                },
                            })
                            
                        },
                        fail(res) {
                            console.error(res)
                        }
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

        let that = this;
        wx.getScreenBrightness({
            success: function (res) {
                that.setData({
                    Brightness: res.value
                })
                if (res.value < 1) {
                    wx.setScreenBrightness({
                        value: 1,
                        success: function (res) {
                            console.log(res, '亮度设置成功')
                        },
                        fail: function (e) {
                            console.log(e)
                        }
                    });
                }
            }
        })

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        wx.setScreenBrightness({
            value: this.data.Brightness,
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        wx.setScreenBrightness({
            value: this.data.Brightness,
        })
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

    randomWord: function () {

        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '[', '/', '=', '+', '-', ']'];

        var nums = "";

        for (var i = 0; i < 100; i++) {

            var id = parseInt(Math.random() * 67);

            nums += chars[id];

        }

        return nums;

    },


})