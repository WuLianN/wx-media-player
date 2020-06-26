import api from '../../../api/index.js'
import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../../store/index.js'

Component({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store,
    fields: ["songList"],
    actions: {
      setSongList: 'setSongList',
      setAllSongId: 'setAllSongId'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    songListDetail: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftTitle: '歌单',
    _songList: null,
    share: '分享',
    comment: '评论',
    startTouches: '',
    endTouches: '',
    scrollTop: 0,
    isActive: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获得歌单信息
    getSongList(id) {
      api.getSongList(id).then(res => {
        const result = res.data.playlist.trackIds
        const ids = result.map(item => {
          return item.id
        })

        // 存储 歌单的所有歌曲id
        this.setAllSongId(ids)

        const standardIds = ids.toString()
        this.getSongDetail(standardIds)
      })
    },

    // 获取歌单的所有歌曲
    getSongDetail(standardIds) {
      api.getSongDetail(standardIds).then(res => {
        let purifyRes = []
        const result = res.data.songs
        result.forEach(item => {
          purifyRes.push({
            id: item.id,
            songName: item.name,
            artist: item.ar[0].name,
            picUrl: item.al.picUrl,
            api: 'WY'
          })
        })

        this.setSongList(purifyRes)
        this.setData({
          _songList: purifyRes
        })
      })
    },

    getStart(e) {
      // 第一个触点
      this.setData({
        startTouches: e.touches
      })
    },

    getEnd(e) {
      // 最后一个触点
      this.setData({
        endTouches: e.changedTouches
      })

      const query = wx.createSelectorQuery()
      query.select('.footer-list >>> .list').boundingClientRect()
      query.selectViewport().scrollOffset()

      let _this = this
      query.exec(function(res) {
        _this.setData({
          scrollTop: res[1].scrollTop
        })
      })

      this.slide()
    },

    touchMove() {
      // this.slide();
    },

    slide() {
      if (this.data.startTouches.length > 0 && this.data.endTouches.length > 0) {
        // 起点
        const startClientX = this.data.startTouches[0].clientX
        const startClientY = this.data.startTouches[0].clientY

        // 终点
        const endClientX = this.data.endTouches[0].clientX
        const endClientY = this.data.endTouches[0].clientY

        if (startClientY - endClientY > 0) {
          // 上划
          this.setData({
            isActive: true,
            leftTitle: ''
          })
        } else if (this.data.scrollTop === 0) {
          // 下滑
          this.setData({
            isActive: false,
            leftTitle: '歌单'
          })
        }
      }
    },
  },

  observers: {
    'songListDetail': function(songListDetail) {

      if (songListDetail) {
        const id = songListDetail.id

        // 获取songList
        this.getSongList(id)
      }
    }
  }
})