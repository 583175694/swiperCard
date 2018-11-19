// pages/login/login.js
Page({
  data: {
    username: ''
  },

  getUserInfo: function(e) {
    wx.login({
      success: function (res) {
        console.log(res)
      }
    })
  }
})