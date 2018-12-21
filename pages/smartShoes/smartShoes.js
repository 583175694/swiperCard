// pages/smartShoes/smartShoes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stateList: [{
      img: '../../assets/sun.png',
      imgActive: '../../assets/sun-1.png',
    }, {
      img: '../../assets/snow.png',
      imgActive: '../../assets/snow-1.png'
    }, {
      img: '../../assets/drop.png',
      imgActive: '../../assets/drop-1.png',
    }, {
      img: '../../assets/wind.png',
      imgActive: '../../assets/wind-1.png'
    }],
    current: 0,
    celsius: 30
  },

  switchState(e) {
    this.setData({
      current: e.currentTarget.dataset.index
    })
  },

  sliderchange(e) {
    this.setData({
      celsius: e.detail.value
    })
  }
})