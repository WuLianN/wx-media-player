const app = new getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    duration: Number,
    currentTime: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    porgress: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateProgress() {
      // 当前时间
      const currentTime = this.properties.currentTime

      // 歌曲总长度
      const duration = this.properties.duration

      const _this = this

      // dom总长度
      const query = this.createSelectorQuery()
      query.select('.progress-line')
        .boundingClientRect(function(rect) {
          const lineLength = rect.width

          // 向下取整
          const TcurrentTime = Math.floor(currentTime)
          const Tduration = Math.floor(duration)
          const TlineLength = Math.floor(lineLength)

          // 当前进度
          const progress =
            Math.floor((TcurrentTime / Tduration) * TlineLength) + 'px'

          _this.setData({
            progress: progress
          })
        })
        .exec()
    },

    touchEnd(e) {
      const touchEnd = e.changedTouches[0].clientX

      // 歌曲总长度
      const duration = this.properties.duration

      const _this = this

      const query = this.createSelectorQuery()
      query.select('.progress-line')
        .boundingClientRect(function(rect) {
          const lineLength = rect.width
          const TtouchEnd = Math.floor(touchEnd)
          const Tduration = Math.floor(duration)
          const TlineLength = Math.floor(lineLength)
          // 进度条距离左屏幕宽度的距离
          const otherLength = rect.left
          // style样式

          const leftLength = TtouchEnd - otherLength + 'px'
          const currentTime = Math.floor(
            ((TtouchEnd - otherLength) / TlineLength) * Tduration
          )

          console.log(currentTime/1000)

          const audio = app.globalData.audio
          audio.currentTime = currentTime / 1000

          _this.setData({
            progress: leftLength,
          })
        })
        .exec()
    },

    touchMove(e) {
      const touchMove = e.touches[0].clientX
      const TtouchMove = Math.floor(touchMove)
      const _this = this

      // 进度条距离左屏幕宽度的距离
      const query = this.createSelectorQuery()
      query.select('.progress-line')
        .boundingClientRect(function(rect) {
          const otherLength = rect.left
          const leftLength = TtouchMove - otherLength + 'px'

          _this.setData({
            progress: leftLength,
          })
        })
        .exec()
    }
  },

  observers: {
    'currentTime': function() {
      this.updateProgress()
    }
  }
})