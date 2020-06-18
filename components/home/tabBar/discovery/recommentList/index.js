import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../../../../store/index.js'

Component({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store,
    field: ['songListData'],
    actions: {
      isShowSongListDetail: 'isShowSongListDetail',
      setSongListData: 'setSongListData'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    songListData: Array
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
    getSongListData(event){
      const data = event.currentTarget.dataset.songlistdata
      this.isShowSongListDetail(true)
      this.setSongListData(data)
    }
  },

  lifetimes: {
    attached: function() {

    }
  }
})