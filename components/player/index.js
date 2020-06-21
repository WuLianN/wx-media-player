// components/player/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songData: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlayerOrlyrics: true,
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