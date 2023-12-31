// miniprogram/pages/modify_info/modify_info.js
const app = getApp();
const db = wx.cloud.database();
const com = db.command
var id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    address: "",
    address_detail: ""
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
    wx.showLoading({
      title: '请稍后',
      mask: true,
    })
    const that = this
    db.collection('user_info').where({
      _openid: app.globalData.openid
    }).get().then(res => {
      this.setData({
        phone: res.data[0].phone,
        address: res.data[0].address,
        address_detail: res.data[0].address_detail
      })
      id = res.data[0]._id
      wx.hideLoading()
    })
  },
  update_deliver_address: function (e) {
    this.setData({
      deliver_address: e.detail.detail.value
    })
  },
  update_phone: function (e) {
    this.setData({
      phone: e.detail.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  modify: function () {
    const that = this
    wx.showLoading({
      title: '请稍后',
      mask: true,
    })
    var temp=parseInt(that.data.index)
    db.collection('user_info').doc(id).update({
      data: {
        campus: temp,
        address: that.data.deliver_address,
        phone: that.data.phone
      },
    }).then(
      app.globalData.campus=temp,
      wx.hideLoading(),
      wx.switchTab({
        url: '../my_info/my_info',
      })
    )
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

  }
})