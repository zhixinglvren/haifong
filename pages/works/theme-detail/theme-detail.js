// theme-detail.js
const util = require('../../../utils/util.js')

Page({
  data: {
    id: null,
    name: '',
    isLoading: true,
    works: []
  },

  onLoad(options) {
    const { id, name } = options
    this.setData({
      id,
      name: decodeURIComponent(name || '')
    })
    
    // 获取主题作品
    this.fetchThemeWorks(id)
  },
  
  // 获取主题作品列表
  fetchThemeWorks(id) {
    // 模拟网络请求获取数据
    // 实际应用中应该调用API
    setTimeout(() => {
      // 假设这是从服务器获取的数据
      const themeWorks = [
        {
          id: 1,
          title: '城市夜景',
          imageUrl: '/images/theme-city.jpg',
          likes: 126,
          collections: 58
        },
        {
          id: 2,
          title: '城市建筑',
          imageUrl: '/images/theme-city.jpg',
          likes: 98,
          collections: 42
        },
        {
          id: 3,
          title: '城市日出',
          imageUrl: '/images/theme-city.jpg',
          likes: 156,
          collections: 67
        },
        {
          id: 4,
          title: '城市地标',
          imageUrl: '/images/theme-city.jpg',
          likes: 112,
          collections: 53
        }
      ]
      
      this.setData({
        works: themeWorks,
        isLoading: false
      })
    }, 500)
  },
  
  // 点击作品项
  onWorkTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/works/work-detail/work-detail?id=${id}`
    })
  },
  
  // 用户分享
  onShareAppMessage() {
    return util.getShareConfig(
      `海风影像馆 - ${this.data.name}`,
      `/pages/works/theme-detail/theme-detail?id=${this.data.id}&name=${encodeURIComponent(this.data.name)}`
    )
  },
  
  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: `海风影像馆 - ${this.data.name}`,
      query: `id=${this.data.id}&name=${encodeURIComponent(this.data.name)}`
    }
  }
}) 