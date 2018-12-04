Page({
  data: {
    coupons: [{
      value: '体态健身代金卷5元',
      checked: false
    }, {
      value: '步态健身代金卷5元',
      checked: false
    }],
    show: true
  },
  showDraw() {
    this.setData({
      show: true
    })
  },

  hideDraw() {
    this.setData({
      show: false
    })
  }
})