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
      const audio = app.globalData.audio = wx.createInnerAudioContext()
      audio.onPause().then(res => {
        
      })

      console.log(app.globalData.audio)
    }
  }
})