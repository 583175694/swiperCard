Page({
  data: {
    listData: [],
    pickArea: [],
    areaName: '',
    priority: '',
    layer: false
  },
  onLoad: function () {
    this.getAreaList()
  },

  // 查找全部列表
  getAreaList() {
    var that = this;
    wx.request({
      url: 'http://localhost:8082/demo/superadmin/listarea',
      method: 'GET',
      success(res) {
        that.setData({
          listData: res.data.areaList,
          pickArea: res.data.areaList
        })
      }
    })
  },

  // 打开/隐藏蒙层
  toAddArea() {
    this.setData({
      layer: !this.data.layer
    })
  },

  // 区域输入框
  areaNameInput(e) {
    this.setData({
      areaName: e.detail.value
    })
  },

  // 优先级输入款
  areaPriority(e) {
    this.setData({
      priority: e.detail.value
    })
  },

  // 添加区域
  addArea(e) {
    var that = this;
    if (that.data.areaName && that.data.priority) {
      wx.request({
        url: 'http://localhost:8082/demo/superadmin/addarea',
        data: {
          areaName: that.data.areaName,
          priority: that.data.priority,
          createTime: new Date(),
          lastEditTime: new Date()
        },
        method: 'POST',
        success(res) {
          that.getAreaList()
          that.toAddArea()
        }
      })
    }
  },

  // 通过areaId查找列表
  bindPickerChange: function (e) {
    var that = this;
    this.setData({
      index: e.detail.value
    })
    wx.request({
      url: 'http://localhost:8082/demo/superadmin/getareabyid?areaId=' + that.data.pickArea[e.detail.value].areaId,
      data: {},
      method: 'GET',
      success(res) {
        var array = []
        array.push(res.data.area)
        that.setData({
          listData: array
        })
      }
    })
  },

  // 删除Area
  deleteArea(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8082/demo/superadmin/removearea?areaId=' + e.currentTarget.dataset.areaid,
      data: {},
      method: 'GET',
      success(res) {
        that.getAreaList()
      }
    })
  }
})