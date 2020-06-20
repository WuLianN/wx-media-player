import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../../store/index.js'

const app = new getApp()

Component({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store,
    fields: ['url', 'songList', 'songData']
  },

  /**
   * 组件的初始数据
   */
  data: {
    picUrl: '/assets/player/recordx.png',
    playerStatus: '/assets/player/pause-gray.png',
    musicList: '/assets/player/musiclist-gray.png',
    isShowMask: false,
    _songList: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    songDetail() {

    },

    exChange() {
      const audio = app.globalData.audio
      const isPaused = audio.paused

      const playImg = '/assets/player/play-gray.png'
      const pauseImg = '/assets/player/pause-gray.png'

      if (isPaused) {
        // 播放
        app.globalData.audio.play()
        this.setData({
          playerStatus: playImg
        })
      } else {
        // 暂停
        app.globalData.audio.pause()
        this.setData({
          playerStatus: pauseImg
        })
      }
    },

    musicList() {
      const maskStatus = this.data.isShowMask
      if (maskStatus) {
        // true -> false
        this.setData({
          isShowMask: false
        })
      } else {
        // false -> true
        this.setData({
          isShowMask: true
        })
      }
    },

    closeMask() {
      this.setData({
        isShowMask: false
      })
    }
  },

  observers: {
    'url': function(url) {
      // 存在 url
      if (url) {
        // 播放音乐
        const audio = app.globalData.audio
        audio.src = url
        audio.autoplay = true

        // 更新播放状态的图标
        const playImg = '/assets/player/play-gray.png'
        this.setData({
          playerStatus: playImg
        })

        this.setData({
          _songList: this.data.songList
        })
      }
    }
  }
})