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
      setIsResetRotateAngle: 'setIsResetRotateAngle'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    songData: Object,
    isRotate: Boolean,
    isResetRotateAngle: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    picUrl: '/assets/player/recordx.png',
    interval: null,
    rotate: 'rotate({ 0 })',
    rotateAngle: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    isCollect() {},

    // 音乐转盘旋转
    rotating() {
      const interval = setInterval(() => {
        let rotateAngle = this.data.rotateAngle
        rotateAngle += 1

        const rotate = `rotate(${rotateAngle}deg)`

        this.setData({
          rotateAngle: rotateAngle,
          rotate: rotate
        })
      }, 100)

      this.setData({
        interval: interval
      })
    },
  },

  observers: {
    'isRotate': function(isRotate) {
      if (isRotate) {
        // 转动转盘
        this.rotating()
      } else {
        clearInterval(this.data.interval)
      }
    },

    'isResetRotateAngle': function(isReset) {
      if (isReset === true) {
        // 重置 isResetRotateAngle 为 false
        this.setIsResetRotateAngle(false)

        this.setData({
          rotateAngle: 0
        })
      }
    }
  }
})