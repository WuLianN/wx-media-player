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
    fields: ['duration', 'currentTime', 'songList', 'isRotate', 'isResetRotateAngle'],
  },
  /**
   * 组件的属性列表
   */
  properties: {
    songData: Object,
    status: String
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
    }
  }
})