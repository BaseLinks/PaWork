// miniprogram/pages/my_info/my_info.js
const app = getApp();
const db = wx.cloud.database();
const com = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    deliver_address:"",
    index:0,
    count:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.login == false) {
      wx.showModal({
        title: '未注册',
        content: '您还没有趴活，是否前往注册',
        success (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../to_regist/to_regist',
            })
          }
        }
      })
      return
    }
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
        deliver_address: res.data[0].address,
      })
      db.collection('order').where(com.or([
        {
          _openid: app.globalData.openid,
          complete:"1"
        },
        {
          status: app.globalData.openid,
          complete:"1"
        }
      ])).count().then(res => {
        this.setData({
          count:res.total
        })
        wx.hideLoading()
      })
    })
  },
  to_modify_info: function () {
    wx.navigateTo({
      url: '../modify_info/modify_info'
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})