// pages/login/login.js
Page({
  data: {
    username: '',
    password: '',
    birthday: '',
    idCard: '',
    phone: ''
  },

  getUserInfo: function(e) {
    wx.login({
      success: function (res) {
        console.log(res)
        var code = res.code;
      }
    })
  },

  username: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  birthday: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },

  idCard: function (e) {
    this.setData({
      idCard: e.detail.value
    })
  },

  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  loginBtn: function(e) {
    console.log(this.data.username, this.data.password)
    wx:wx.request({
      url: 'http://localhost:8090/regsion',
      data: {
        username: this.data.username,
        password: this.data.password,
        birthday: this.data.birthday,
        id_card: this.data.idCard,
        phone: this.data.phone,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
      }
    })
  }
})