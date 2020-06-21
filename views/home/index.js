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
    isShowPlayer: false
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

      audio.autoplay = true

      // 可以播放状态
      audio.onCanplay(function() {
     
      })

      // 播放
      audio.onPlay(function() {

      })

      // 暂停
      audio.onPause(function() {

      })

      // 错误
      audio.onError(function(err) {
        // 跳转下一首
        console.log(err)
      })

      // 结束 -> 自动播放下一首
      audio.onEnded(function() {
        _this.getNextSong(_this)
      })
    },

    // 展示播放页
    showPlayer(e) {
      const status = e.detail.status
      this.setData({
        isShowPlayer: status
      })
    },

    getNextSong(_this) {
      const id = _this.data.id
      const allSongId = _this.data.allSongId
      const currentIdIndex = allSongId.indexOf(id)
      if (currentIdIndex !== -1) {
        let nextIdIndex
        let nextSongId

        const theLastIndex = allSongId.length

        if (currentIdIndex === theLastIndex) {
          nextIdIndex = 0
          nextSongId = allSongId[nextIdIndex]
        } else {
          nextIdIndex = currentIdIndex + 1
          nextSongId = allSongId[nextIdIndex]
        }

        // 存储id -> 更新id
        _this.setId(nextSongId)
      }
    }
  }
})