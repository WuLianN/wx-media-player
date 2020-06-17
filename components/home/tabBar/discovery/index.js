import api from '../../../../api/index.js'
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
    banner: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取banner
    getBanner() {
      api.getBanner(1).then(res => {
        const result = res.data.banners
        let data = []
        result.forEach(item => {
          data.push({
            picUrl: item.pic,
            targetType: item.targetType,
            targetId: item.targetId,
            song: item.song,
            typeTitle: item.typeTitle,
            titleColor: item.typeColor
          })
        })
        this.setData({
          banner: data
        })
      })
    }
  },

  lifetimes: {
    attached: function() {
      this.getBanner()
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    }
  },

})