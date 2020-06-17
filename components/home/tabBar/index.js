// components/home/navBar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 'discovery',
    icon: {
      normal: '/assets/home/content.png'
    },

    search: {
      normal: '/assets/home/search.png'
    },
    activeControls: [false, false, true, false, false, false]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      this.setData({
        active: event.detail
      });

      this.changeTab(this.data.active)
    },

    changeTab(active) {
      const tabType = ['login', 'user', 'discovery', 'friends', 'video', 'search']
      const index = tabType.indexOf(active)
      let all = [false, false, false, false, false, false]
      all[index] = true

      this.setData({
        activeControls: all
      })
    }
  },


  options: {
    styleIsolation: 'shared'
  }
})