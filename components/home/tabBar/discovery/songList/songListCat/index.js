import api from '../../../../../../api/index.js'

const myBehavior = require('../../../../../../behaviors/index.js')

Component({
  behaviors: [myBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    category: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    purifyResult: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData(page) {
      api.getHotSongList(this.properties.category, 18, page).then(res => {
        const result = res.data.playlists
        let purifyResult = []
        result.forEach((item, index) => {
           purifyResult.push({
            name: item.name,
            coverImgUrl: item.coverImgUrl,
            playCount: item.playCount,
            avatarUrl: item.creator.avatarUrl,
            nickname: item.creator.nickname,
            description: item.description,
            shareCount: item.shareCount,
            tags: item.tags,
            id: item.id,
            trackCount: item.trackCount,
            commentCount: item.commentCount,
            api: 'WY',
            type: 'songList'
          })
        })

        this.setData({
          purifyResult: purifyResult
        })
      })
    }
  },

  lifetimes: {
    attached: function(){
      this.getData(0)
    }
  }
})