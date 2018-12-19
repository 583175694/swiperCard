// pages/checkboxCard/checkboxCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      id: 0,
      avatar: '../../assets/swiper1.png',
      name: "ROOKIE",
      check: true
    }, {
      id: 1,
      avatar: '../../assets/swiper1.png',
      name: "ROOKIE",
      check: false
    }, {
      id: 2,
      avatar: '../../assets/swiper1.png',
      name: "ROOKIE",
      check: true
    }, {
      id: 3,
      avatar: '../../assets/swiper1.png',
      name: "ROOKIE",
      check: true
    }, {
      id: 4,
      avatar: '../../assets/swiper1.png',
      name: "ROOKIE",
      check: false
    }, {
      id: 5,
      avatar: '../../assets/swiper1.png',
      name: "ROOKIE",
      check: true
    }],
    current: 0
  },
  checkCoach(e) {
    var coachArr = []
    var that = this
    this.data.list[e.currentTarget.dataset.check].check = !this.data.list[e.currentTarget.dataset.check].check
    this.data.list.map((res, index) => {
      if (that.data.list[index].check == true) {
        coachArr.push(that.data.list[index].id)
      }
    })
    console.log(coachArr)
    this.setData({
      list: this.data.list
    })

  }
})