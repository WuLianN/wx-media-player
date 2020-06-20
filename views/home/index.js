const app = new getApp()
import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/index.js'

import api from '../../api/index.js'

Component({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store,
    fields: ['isShow', 'songListDetail', 'url', 'songData', 'allSongId', 'id'],
    actions: {
      setUrl: 'setUrl',
      setId: 'setId'
    }
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

      const _this = this

      // 暂停
      audio.onPause(function() {

      })

      // 自动播放下一首
      audio.onEnded(function() {
        console.log(_this.data.id)
        const id = _this.data.id
        const allSongId = _this.data.allSongId
        const currentIndex = allSongId.indexOf(id)

        if (id !== -1) {
          const nextSongId = allSongId[currentIndex + 1]
          const timestamp = +new Date()
          const url = _this.getUrl(nextSongId, timestamp)
          audio.src = url

          // 存储id
          _this.setId(id)
        }
      })
    },

    // 获取url
    getUrl(id, timestamp) {
      return api.getUrl(id, timestamp).then(res => {
        const url = res.data.data[0].url
        this.setUrl(url)
        return url
      })
    }
  }
})