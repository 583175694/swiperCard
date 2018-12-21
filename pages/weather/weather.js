let utils = require('../../utils/utils')
let globalData = getApp().globalData
const key = globalData.key
let SYSTEMINFO = globalData.systeminfo
Page({
  data: {
    isIPhoneX: globalData.isIPhoneX,
    message: '',
    cityDatas: {},
    hourlyDatas: [],
    weatherIconUrl: globalData.weatherIconUrl,
    // 用来清空 input
    searchText: '',
    // 是否已经弹出
    hasPopped: false,
    animationMain: {},
    animationOne: {},
    animationTwo: {},
    animationThree: {},
    // 是否切换了城市
    located: true,
    // 需要查询的城市
    searchCity: '',
    setting: {},
    bcgImg: '',
    bcgImgAreaShow: false,
    bcgColor: '#2d2225',
    // 粗暴直接：移除后再创建，达到初始化组件的作用
    showHeartbeat: true,
    // heartbeat 时禁止搜索，防止动画执行
    enableSearch: true,
    openSettingButtonShow: false,
    shareInfo: {},
  },
  success(data, location) {
    this.setData({
      openSettingButtonShow: false,
      searchCity: location,
    })
    wx.stopPullDownRefresh()
    let now = new Date()
    // 存下来源数据
    data.updateTime = now.getTime()
    data.updateTimeFormat = utils.formatDate(now, "MM-dd hh:mm")
    wx.setStorage({
      key: 'cityDatas',
      data,
    })
    this.setData({
      cityDatas: data,
    })
  },
  fail(res) {
    wx.stopPullDownRefresh()
    let errMsg = res.errMsg || ''
    // 拒绝授权地理位置权限
    if (errMsg.indexOf('deny') !== -1 || errMsg.indexOf('denied') !== -1) {
      wx.showToast({
        title: '需要开启地理位置权限',
        icon: 'none',
        duration: 2500,
        success: (res) => {
          if (this.canUseOpenSettingApi()) {
            let timer = setTimeout(() => {
              clearTimeout(timer)
              wx.openSetting({})
            }, 2500)
          } else {
            this.setData({
              openSettingButtonShow: true,
            })
          }
        },
      })
    } else {
      wx.showToast({
        title: '网络不给力，请稍后再试',
        icon: 'none',
      })
    }
  },
  commitSearch(res) {
    let val = ((res.detail || {}).value || '').replace(/\s+/g, '')
    this.search(val)
  },
  dance() {
    this.setData({
      enableSearch: false,
    })
    let heartbeat = this.selectComponent('#heartbeat')
    heartbeat.dance(() => {
      this.setData({
        showHeartbeat: false,
        enableSearch: true,
      })
      this.setData({
        showHeartbeat: true,
      })
    })
  },
  clearInput() {
    this.setData({
      searchText: '',
    })
  },
  search(val, callback) {
    if (val === '520' || val === '521') {
      this.clearInput()
      this.dance()
      return
    }
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300,
    })
    if (val) {
      this.setData({
        located: false,
      })
      this.getWeather(val)
      this.getHourly(val)
    }
    callback && callback()
  },
  // wx.openSetting 要废弃，button open-type openSetting 2.0.7 后支持
  // 使用 wx.canIUse('openSetting') 都会返回 true，这里判断版本号区分
  canUseOpenSettingApi() {
    let systeminfo = getApp().globalData.systeminfo
    let SDKVersion = systeminfo.SDKVersion
    let version = utils.cmpVersion(SDKVersion, '2.0.7')
    if (version < 0) {
      return true
    } else {
      return false
    }
  },
  init(params, callback) {
    this.setData({
      located: true,
    })
    wx.getLocation({
      success: (res) => {
        this.getWeather(`${res.latitude},${res.longitude}`)
        this.getHourly(`${res.latitude},${res.longitude}`)
        callback && callback()
      },
      fail: (res) => {
        this.fail(res)
      }
    })
  },
  getWeather(location) {
    wx.request({
      url: `${globalData.requestUrl.weather}`,
      data: {
        location,
        key,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          let data = res.data.HeWeather6[0]
          if (data.status === 'ok') {
            this.clearInput()
            this.success(data, location)
          } else {
            wx.showToast({
              title: '查询失败',
              icon: 'none',
            })
          }
        }
      },
      fail: () => {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
        })
      },
    })
  },
  getHourly(location) {
    wx.request({
      url: `${globalData.requestUrl.hourly}`,
      data: {
        location,
        key,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          let data = res.data.HeWeather6[0]
          if (data.status === 'ok') {
            this.setData({
              hourlyDatas: data.hourly || []
            })
          }
        }
      },
      fail: () => {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
        })
      },
    })
  },
  onPullDownRefresh(res) {
    this.reloadPage()
  },
  getCityDatas() {
    let cityDatas = wx.getStorage({
      key: 'cityDatas',
      success: (res) => {
        this.setData({
          cityDatas: res.data,
        })
      },
    })
  },
  setBcgImg(index) {
    this.setData({
      bcgImg: '/assets/sun-1.jpg',
      bcgColor: '#42b7da'
    })
    this.setNavigationBarColor()
  },
  setNavigationBarColor() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#42b7da',
    })
  },
  // getBroadcast(callback) {
  //   wx.cloud.init({
  //     env: 'smart-shoes-4770ed'
  //   })
  //   wx.cloud.callFunction({
  //     name: 'getBroadcast',
  //     data: {
  //       hour: new Date().getHours(),
  //     },
  //   })
  //     .then(res => {
  //       let data = res.result.data
  //       if (data) {
  //         callback && callback(data[0].message)
  //       }
  //     })
  // },
  // reloadGetBroadcast() {
  //   this.getBroadcast((message) => {
  //     this.setData({
  //       message,
  //     })
  //   })
  // },
  reloadWeather() {
    if (this.data.located) {
      this.init({})
    } else {
      this.search(this.data.searchCity)
      this.setData({
        searchCity: '',
      })
    }
  },
  onShow() {
    // onShareAppMessage 要求同步返回
    if (!utils.isEmptyObject(this.data.shareInfo)) {
      return
    }
  },
  onLoad() {
    this.reloadPage()
  },
  reloadPage() {
    this.setBcgImg()
    this.getCityDatas()
    this.reloadWeather()
    // this.reloadGetBroadcast()
  },
  onShareAppMessage(res) {
    let shareInfo = this.data.shareInfo
    return {
      title: shareInfo.title || 'Quiet Weather',
      path: shareInfo.path || '/pages/index/index',
      imageUrl: shareInfo.imageUrl,
    }
  },
  hrefSmartShoes() {
    wx.navigateTo({
      url: '../smartShoes/smartShoes'
    })
  }
})