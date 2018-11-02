Page({
  data: {

  },

  onLoad: function(options) {

  },

  clickShare: function() {
    // const wxGetImageInfo = promisify(wx.getImageInfo)

    wx.getImageInfo({
      src: 'https://ofdznzfo9.qnssl.com/rmall_share.png',
      success: function(res) {
        wx.getImageInfo({
          src: 'https://ofdznzfo9.qnssl.com/rmall_qrcode.jpg',
          success: function(res2) {
            const ctx = wx.createCanvasContext('shareCanvas')

            // 底图
            ctx.drawImage(res.path, 0, 0, 240, 425.6)

            // 作者名称
            ctx.setTextAlign('center') // 文字居中
            ctx.setFillStyle('#000000') // 文字颜色：黑色
            ctx.setFontSize(16) // 文字字号：22px
            ctx.fillText("作者：吴小航", 240 / 2, 300)

            const qrImgSize = 60
            ctx.drawImage(res2.path, (350 - qrImgSize) / 2, 36, qrImgSize, qrImgSize)

            ctx.stroke()
            ctx.draw()
          }
        })
      }
    })
  },

  clickSave: function() {
    wx.canvasToTempFilePath({
      canvasId: 'shareCanvas',
      success: function(res) {
        wx.previewImage({
          urls: [res.tempFilePath],
          success: function(res) {
            console.log(res)
          }
        })
      }
    })
  }
})