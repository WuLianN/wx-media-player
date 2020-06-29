import api from '../../api/index.js'
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
    fields: ["songListDetail", "songList"]
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
    share: '分享',
    comment: '评论',
    startTouches: '',
    endTouches: '',
    scrollTop: 0,
    isActive: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
    uploadScrollTop(e) {
      const scrollTop = e.detail.scrollTop
      if (scrollTop > 50) {
        // 上划
        this.setData({
          isActive: true,
          leftTitle: ''
        })
      } else if (scrollTop === 0) {
        // 下滑
        this.setData({
          isActive: false,
          leftTitle: '歌单'
        })
      }
    }
  }
})