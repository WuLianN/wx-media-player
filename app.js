App({
  onLaunch: function() {

    // wx.navigateTo({
    //   url: '/views/home/index'
    // })

  },
  globalData: {
    audio: null,

    audioData: {
      id: 0,
      picUrl: '',
      songName: '',
      songArtist: '',
      api: '',
      isUpdate: '',
    },

    songListData: [],

    isShow: true
  }
})