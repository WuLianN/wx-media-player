import {
  debounce,
  formatSec
} from '../../../utils/util.js'

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
      setIsProgressControl: 'setIsProgressControl'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    lyric: Array,
    currentTime: Number,
    duration: Number,
    isProgressControl: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenHeight: 0, //可视区域高度
    scrollTop: 0,
    middle: 0, // 最中间索引
    itemSize: 90,
    listHeight: 0,
    visibleCount: 0, //可显示的列表项数
    getTransform: '',
    isSameStartOffset: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrollEvent(e) {
      // 当前滚动位置
      const scrollTop = e.detail.scrollTop
      // 此时的开始索引
      const start = Math.floor(scrollTop / this.data.itemSize);
      // 此时的结束索引
      const end = start + this.data.visibleCount;
      // 计算最中间的索引
      const middle = Math.floor(start + end / 2);
    },

    //列表总高度
    listHeight() {
      const listHeight = this.properties.lyric.length * this.data.itemSize;
      return listHeight
    },

    //可显示的列表项数
    visibleCount() {
      const screenHeight = 810
      const itemSize = this.data.itemSize
      const visibleCount = Math.ceil(screenHeight / itemSize);
      return visibleCount
    },

    // 偏移量对应的style
    getTransform(startOffset) {
      const scrollTop = `${startOffset}rpx`;
      this.setData({
        scrollTop: scrollTop
      })
    }
  },

  observers: {
    'lyric': function(status) {

      if (status.length > 0) {
        const screenHeight = 810
        const start = 0
        const visibleCount = this.visibleCount()
        const end = start + visibleCount
        // 列表总高度
        const listHeight = this.listHeight()

        const middle = Math.floor((start + end) / 2);

        // 初始化歌词位置
        this.getTransform(0)
        // 初始化滚动条控制
        this.setIsProgressControl(false)

        this.setData({
          screenHeight: screenHeight,
          listHeight: listHeight,
          middle: middle,
          visibleCount: visibleCount
        });
      }
    },

    'currentTime': function(currentTime) {
      if (currentTime >= 2) {
        const floorTime = Math.floor(currentTime)
        const formatSecTime = formatSec(floorTime)
        const middle = this.data.middle // [0, 9]
        const lyric = this.properties.lyric
        const itemSize = this.data.itemSize

        if (this.properties.isProgressControl) {
          const currentTime = Math.floor(this.properties.currentTime)
          const duration = Math.floor(this.properties.duration)
          const scrollHeight = lyric.length * itemSize
          const scrollTop = Math.floor((currentTime / duration) * scrollHeight)

          const startOffset = scrollTop - (scrollTop % itemSize);

          const start = Math.floor(scrollTop / itemSize);
          // 此时的结束索引
          const end = start + this.data.visibleCount;
          // 计算最中间的索引
          const middle = Math.floor(start + end / 2);

          if (this.data.isSameStartOffset !== startOffset) {
            this.getTransform(startOffset - itemSize * 4)
            // 更新middle
            this.setData({
              middle: middle + 1,
            })
          }

          this.setData({
            isSameStartOffset: startOffset
          })
        } else {
          if (formatSecTime === lyric[middle].time) {
            this.getTransform(itemSize * (middle - 4))
            // 更新middle
            this.setData({
              middle: middle + 1
            })
          }
        }
      }
    }
  }
})