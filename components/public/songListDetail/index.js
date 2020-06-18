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
    actions: {
      setSongList: 'setSongList'
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
      })
    }
  },

  observers: {
    'songListDetail': function(songListDetail) {
      console.log(songListDetail)

      if (songListDetail) {
        const id = songListDetail.id

        this.getSongList(id)
      }


    }
  }
})