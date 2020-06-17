import api from '../../../../api/index.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    banner: [],
    songListData: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取banner
    getBanner() {
      api.getBanner(1).then(res => {
        const result = res.data.banners
        let data = []
        result.forEach(item => {
          data.push({
            picUrl: item.pic,
            targetType: item.targetType,
            targetId: item.targetId,
            song: item.song,
            typeTitle: item.typeTitle,
            titleColor: item.typeColor
          })
        })
        this.setData({
          banner: data
        })
      })
    },

    // 获取推荐歌单
    getRecommentList() {
      api.getRecommentList(30).then(res => {
        const result = res.data.result
        const recommentList = []

        result.forEach((item, index) => {
          recommentList.push({
            id: item.id,
            name: item.name,
            coverImgUrl: item.picUrl,
            playCount: item.playCount,
            description: item.copywriter,
            shareCount: '分享',
            tags: item.tags,
            trackCount: item.trackCount,
            commentCount: '评论',
            type: 'songList'
          })
        })

        console.log(result)

        this.setData({
          songListData: result.slice(0, 6)
        })

  

        // if (this.isFirstTimeLoad) {
        //   const data = recommentList.slice(0, 6)
        //   this.purifyResult.push(data)

        //   // 首次加载后不再加载
        //   this.isFirstTimeLoad = false
        // } else {
        //   // 完成下拉刷新
        //   this.scroll.finishPullDown()

        //   const min = Math.floor(Math.random() * 7)
        //   const max = min + 6
        //   const data = recommentList.slice(min, max)

        //   // 清空purifyResult
        //   clearArray(this.purifyResult)
        //   this.purifyResult.push(data)
        // }
      })
    },
  },

  lifetimes: {
    attached: function() {
      this.getBanner()

      this.getRecommentList()
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    }
  },

})