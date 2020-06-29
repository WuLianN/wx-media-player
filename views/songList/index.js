
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
    active: '全部',
    specialCat: '全部',
    category: [
      '全部',
      '官方',
      '精品',
      '华语',
      '流行',
      '民谣',
      '摇滚',
      '电子'
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(event){
      console.log(event.detail.name)
    }
  }
})