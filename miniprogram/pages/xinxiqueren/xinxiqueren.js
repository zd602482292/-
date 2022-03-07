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

    getage(idcard) {
        let len = (idcard + "").length;
        let strBirthday = "";
        if (len == 18) {
            //处理18位的身份证号码从号码中得到生日和性别代码
            strBirthday =
                idcard.substr(6, 4) +
                "/" +
                idcard.substr(10, 2) +
                "/" +
                idcard.substr(12, 2);
        }
        if (len == 15) {
            let birthdayValue = "";
            birthdayValue = idcard.charAt(6) + idcard.charAt(7);
            if (parseInt(birthdayValue) < 10) {
                strBirthday =
                    "20" +
                    idcard.substr(6, 2) +
                    "/" +
                    idcard.substr(8, 2) +
                    "/" +
                    idcard.substr(10, 2);
            } else {
                strBirthday =
                    "19" +
                    idcard.substr(6, 2) +
                    "/" +
                    idcard.substr(8, 2) +
                    "/" +
                    idcard.substr(10, 2);
            }
        }
        //时间字符串里，必须是“/”
        let birthDate = new Date(strBirthday);
        let nowDateTime = new Date();
        let age = nowDateTime.getFullYear() - birthDate.getFullYear();
        //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
        if (
            nowDateTime.getMonth() < birthDate.getMonth() ||
            (nowDateTime.getMonth() == birthDate.getMonth() &&
                nowDateTime.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
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
        let age=this.getage(jcryidcard)
        console.log(age)
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
                complete,
                age
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