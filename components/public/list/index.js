import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../../store/index.js'

import api from '../../../api/index.js'

Component({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store,
    actions: {
      setUrl: 'setUrl',
      setId: 'setId',
      setSongData: 'setSongData'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    songList: Array,
    needScrollTop: {
      type: Boolean,
      value: false
    }
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
    // 播放
    play(event) {
      const songData = event.currentTarget.dataset.songdata
      const {
        id
      } = songData

      // 存储songData
      this.setSongData(songData)

      // 存储id
      this.setId(id)

      const timestamp = +new Date()
      this.getUrl(id, timestamp)
    },

    // 获取url
    getUrl(id, timestamp) {
      api.getUrl(id, timestamp).then(res => {
        const url = res.data.data[0].url
        this.setUrl(url)
      })
    },


    scroll(e) {
      if (this.properties.needScrollTop){
        const scrollTop = e.detail.scrollTop
        // 触发
        this.triggerEvent('uploadScrollTop', { scrollTop: scrollTop })
      }
    }
  }
})