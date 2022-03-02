const app = getApp()
var util = require('../../utils/time.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        jcryname: null,
        jcrysex: null,
        jcryidcard: null,
        jcryphonenum: null,
        jcrybarcode: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //显示检测人员的信息及扫描的试管条码号
        this.setData({
            jcryname: app.globalData.jcryname,
            jcrysex: app.globalData.jcrysex,
            jcryidcard: app.globalData.jcryidcard,
            jcryphonenum: app.globalData.jcryphonenum,
            jcrybarcode: app.globalData.jcrybarcode
        })
    },


    //确认按钮
    confirm: function () {
        wx.showLoading({
            title: '上传中...',
        })
        let barcode = app.globalData.jcrybarcode
        let jcryname = app.globalData.jcryname
        let jcrysex = app.globalData.jcrysex
        let jcryidcard = app.globalData.jcryidcard
        let jcryphonenum = app.globalData.jcryphonenum
        let time = util.formatTime(new Date())
        let complete = false
        //将信息上传到检测记录数据库中
        wx.cloud.callFunction({
            name: 'jcjladd',
            data: {
                barcode,
                jcryname,
                jcryidcard,
                jcrysex,
                jcryphonenum,
                time,
                complete
            },
            success: res => {
                console.log('检测记录入库成功', res)

                wx.hideLoading({})
                wx.showToast({
                    title: '上传成功',
                    icon: 'success'
                })
                setTimeout(function () {
                    wx.navigateBack({})
                }, 500)

            },
            fail: res => {
                console.log('检测记录入库失败', res)
                wx.hideLoading({})
                wx.showToast({
                    title: '上传失败',
                    icon: 'error'
                })
            }
        })
    }
})