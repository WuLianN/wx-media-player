const app = new getApp()
import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/index.js'

Component({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store,
    fields: ['isShow', 'songListDetail', 'url', 'songData']
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
     _songData: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      this.createAudio()
    },

    // 创建 audio
    createAudio() {
      app.globalData.audio = wx.createInnerAudioContext()
      console.log(app.globalData.audio)
    }
  },

  observers: {
     'url': function(url){
       console.log(url)

       if(url){
         const audio = app.globalData.audio
         audio.src = url
         audio.autoplay = true

         // 更新globalPlayer
         this.setData({
           _songData: this.data.songData
         })
       }
     }
  }

})