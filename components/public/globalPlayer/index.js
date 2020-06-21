import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../../store/index.js'

import api from '../../../api/index.js'

const app = new getApp()

Component({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store,
    fields: ['id', 'nextIdIndex', 'allSongId', 'songList']
  },

  /**
   * 组件的初始数据
   */
  data: {
    picUrl: '/assets/player/recordx.png',
    playerStatus: '/assets/player/pause-gray.png',
    musicList: '/assets/player/musiclist-gray.png',
    isShowMask: false,
    isShowPlayer: false,
    _songList: null,
    songData: ''
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
    },

    showPlayer() {
      this.setData({
        isShowPlayer: true
      })
    },

    unshowPlayer(){
      this.setData({
        isShowPlayer: false
      })
    },

    // 获取url -> 更新url
    getUrl(id, timestamp) {
      return api.getUrl(id, timestamp)
    },

    isOtherSongList(id) {
      const allSongId = this.data.allSongId
      if (allSongId.indexOf(id) !== -1) {
        // 更新songData
        const index = this.data.allSongId.indexOf(id)
        const songData = this.data.songList[index]

        // 更新播放状态的图标
        const playImg = '/assets/player/play-gray.png'
        this.setData({
          playerStatus: playImg,
          songData: songData,
          _songList: this.data.songList
        })
      } else {
        // 更新songList
        this.setData({
          _songList: this.data.songList
        })
      }
    }
  },

  observers: {
    'id': function(id) {
      if (id && id !== 0) {
        // 获取url
        const timestamp = +new Date()
        this.getUrl(id, timestamp).then(res => {
          const url = res.data.data[0].url
          // 播放音乐
          const audio = app.globalData.audio
          audio.src = url

          this.isOtherSongList(id)
        })
      }
    }
  }
})