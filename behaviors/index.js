import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../store/index.js'

import api from '../api/index.js'

module.exports =  Behavior({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store,
    actions: {
      setSongListData: 'setSongListData',
      setSongList: 'setSongList',
      setAllSongId: 'setAllSongId'
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getSongListData(event) {
      const data = event.currentTarget.dataset.songlistdata
      this.setSongListData(data)

      const {id} = data

      this.getSongList(id)

      wx.navigateTo({
        url: '/views/songListDetail/index',
      })
    },

    // 获得歌单信息
    getSongList(id) {
      api.getSongList(id).then(res => {
        const result = res.data.playlist.trackIds
        const ids = result.map(item => {
          return item.id
        })

        console.log(result)

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
        // this.setData({
        //   _songList: purifyRes
        // })
      })
    },

  }
})
