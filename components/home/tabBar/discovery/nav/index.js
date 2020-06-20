// components/home/tabBar/discovery/nav/index.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goRankList() {
      wx.navigateTo({
        url: '/views/rankList/index',
      })
      this.setNavBarTitle('排行榜')
    },

    goSingers() {
      wx.navigateTo({
        url: '/views/singers/index',
      })
      this.setNavBarTitle('歌手')
    },

    goMV() {
      wx.navigateTo({
        url: '/views/mv/index',
      })
      this.setNavBarTitle('MV')
    },

    goSongList() {
      wx.navigateTo({
        url: '/views/songList/index',
      })
      this.setNavBarTitle('歌单')
    },

    setNavBarTitle(title){
      return wx.setNavigationBarTitle({
        title
      })
    }

  }
})