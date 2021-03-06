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
      isShowSongListDetail: 'isShowSongListDetail'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    leftTitle: String,
    where: String,
    active: Number,
    changeClass: Boolean,
    changeImg: Boolean,
    changeImgSize: Boolean
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
    onClickLeft(){
       this.isShowSongListDetail(false)
    }
  }
})
