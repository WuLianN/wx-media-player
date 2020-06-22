const app = new getApp()
import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../../store/index.js'

import {
  shuffle
} from '../../../utils/util.js'

Component({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store,
    fields: ['id', 'allSongId', 'songList'],
    actions: {
      setGlobalPlayerStatus: 'setGlobalPlayerStatus',
      setId: 'setId',
      setIsRandomMode: 'setIsRandomMode'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    status: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playerStatus: '/assets/player/play-white.png',
    playStyleImg: '/assets/player/loop.png',
    playStyleNum: 0,
    isShowMusicList: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 播放or暂停
    playOrPause() {
      const audio = app.globalData.audio
      const isPaused = audio.paused
      if (isPaused) {
        audio.play()
        this.setData({
          playerStatus: '/assets/player/play-white.png'
        })

        // player -> globalPlayer
        this.setGlobalPlayerStatus('play')
      } else {
        audio.pause()
        this.setData({
          playerStatus: '/assets/player/pause-white.png'
        })

        this.setGlobalPlayerStatus('pause')
      }
    },

    // 上一首
    preSong() {
      const currentIndex = this.data.allSongId.indexOf(this.data.id)

      // 排除 - 第一首
      if (currentIndex !== 0) {
        const preCurrentIndex = currentIndex - 1
        const songList = this.data.songList
        const preID = songList[preCurrentIndex].id
        this.setId(preID)
      }
    },

    // 下一首
    nextSong() {
      const currentIndex = this.data.allSongId.indexOf(this.data.id)
      const songList = this.data.songList
      const songListLength = songList.length

      // 排除 - 最后一首
      if (currentIndex < songListLength) {
        const nextCurrentIndex = currentIndex + 1
        const nextID = songList[nextCurrentIndex].id
        this.setId(nextID)
      }
    },

    // 播放方式 随机播放、单曲循环、列表播放
    playStyle() {
      const playStyleNum = this.data.playStyleNum
      const number = playStyleNum + 1

      this.setData({
        playStyleNum: number
      })

      if (this.data.playStyleNum > 3) {
        this.setData({
          playStyleNum: 1
        })
      }

      if (this.data.playStyleNum === 1) {
        // 随机 -> 打乱数组
        this.setData({
          playStyleImg: '/assets/player/random.png'
        })

        // 开启随机模式
        this.setIsRandomMode(true)

      } else if (this.data.playStyleNum === 2) {
        // 单曲
        this.setData({
          playStyleImg: '/assets/player/singlecycle.png'
        })

        // 关闭随机模式
        this.setIsRandomMode(false)

        // 开始单曲循环
        const audio = app.globalData.audio
        audio.loop = true
      } else if (this.data.playStyleNum === 3) {
        // 列表
        this.setData({
          playStyleImg: '/assets/player/loop.png'
        })

        // 关闭单曲循环
        const audio = app.globalData.audio
        audio.loop = false
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
    // globalPlayer -> player
    'status': function(status) {
      if (status === 'play') {
        this.setData({
          playerStatus: '/assets/player/play-white.png'
        })
      } else if (status === 'pause') {
        this.setData({
          playerStatus: '/assets/player/pause-white.png'
        })
      }
    }
  }
})