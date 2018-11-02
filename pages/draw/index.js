var cityData = require('../../utils/city.js');

// page/one/index.js
Page({
  data:{
    content: [],
    theme: [],
    qyopen:false,
    qyshow:false,
    nzopen:false,
    nzshow:false,
    isfull:false,
    cityleft: cityData.getCity(),
    citycenter: {},
    cityright: {},
    select1: '',
    select2:'',
    selectTheme: '',
    shownavindex:''
  },
  onLoad: function(){
    this.setData({
      theme: ['全部主题', '健身主题', '轰趴主题', '亲子主题', '舞蹈主题', '音乐K歌主题','神秘主题'],
    })
  },
  listqy: function(e){
    if(this.data.qyopen){
      this.setData({
        qyopen:false,
        nzopen:false,
        nzshow:true,
        qyshow:false,
        isfull:false,
        shownavindex: 0
      })
    }else{
      this.setData({
        qyopen:true,
        nzopen:false,
        nzshow:true,
        qyshow:false,
        isfull:true,
        shownavindex:e.currentTarget.dataset.nav
      })
    }
    
  },
  list: function(e){
    if(this.data.nzopen){
      this.setData({
        nzopen:false,
        qyopen:false,
        nzshow:false,
        qyshow:true,
        isfull:false,
        shownavindex: 0
      })
    }else{
      this.setData({
        content:this.data.theme,
        nzopen:true,
        qyopen:false,
        nzshow:false,
        qyshow:true,
        isfull:true,
        shownavindex:e.currentTarget.dataset.nav
      })
    }
  },
  listpx: function(e){
    if(this.data.pxopen){
      this.setData({
        nzopen:false,
        qyopen:false,
        nzshow: true,
        qyshow:true,
        isfull:false,
        shownavindex: 0
      })
    }else{
      this.setData({
        content:this.data.px,
        nzopen:false,
        qyopen:false,
        nzshow: true,
        qyshow:true,
        isfull:true,
        shownavindex:e.currentTarget.dataset.nav
      })
    }
  },
  selectleft: function(e){
    console.log(e)
    this.setData({
      cityright:{},
      citycenter:this.data.cityleft[e.currentTarget.dataset.city],
      select1: e.target.dataset.city,
      select2:''
    });
  },
  selectcenter: function(e){
    this.setData({
      cityright:this.data.citycenter[e.currentTarget.dataset.city],
      select2: e.target.dataset.city
    });
  },
  selectTheme: function(e) {
    this.setData({
      selectTheme: e.target.dataset.theme
    })
  },
  hidebg: function(e){

    this.setData({
      qyopen:false,
      nzopen:false,
      nzshow:true,
      qyshow:true,
      isfull:false,
      shownavindex: 0
    })
  }
})