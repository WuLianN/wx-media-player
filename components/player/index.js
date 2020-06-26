import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/index.js'

Component({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store,
    fields: ['duration', 'currentTime', 'songList', 'isRotate', 'isResetRotateAngle', 'isProgressControl'],
  },
  /**
   * 组件的属性列表
   */
  properties: {
    songData: Object,
    status: String,
    lyric: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlayerOrlyrics: true,
    isShowMask: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickLeft() {
      this.triggerEvent('unshowPlayer')
    },

    exchange() {
      // 获得isShowMusicList的状态
      if (this.data.isPlayerOrlyrics) {
        this.setData({
          isPlayerOrlyrics: false
        })
      } else {
        this.setData({
          isPlayerOrlyrics: true
        })
      }
      console.log(this.properties.lyric)
    }
  }
})