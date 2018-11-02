Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [{
      url: '../../assets/swiper1.png'
    },
    {
      url: '../../assets/swiper2.png'
    },
    {
      url: '../../assets/swiper3.png'
    },
    {
      url: '../../assets/swiper4.png'
    },
    {
      url: '../../assets/swiper5.png'
    }
    ],
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGym();
  },

  changeSwiper: function (e) {
    this.setData({
      current: e.detail.current
    })
  },

  getGym: function () {
    wx.request({
      url: 'http://212.64.120.246/gym/gymApplicationLog/getGymApplicationLogList',
      success: function (res) {
        console.log(res)
      }
    })
  }
})