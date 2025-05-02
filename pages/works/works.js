// works.js
const util = require('../../utils/util.js')
const auth = require('../../utils/auth.js')

Page({
  data: {
    tabs: ['主题', '时光机', '城市印象'],
    activeTab: 0,
    
    // 主题分类数据
    themeList: [
      { id: 1, name: '城市之光', cover: '/images/theme-city.jpg', count: 24 },
      { id: 2, name: '爱摄影，爱生活', cover: '/images/theme-life.jpg', count: 18 },
      { id: 3, name: '自然风光', cover: '/images/theme-nature.jpg', count: 32 },
      { id: 4, name: '人文纪实', cover: '/images/theme-documentary.jpg', count: 15 },
      { id: 5, name: '光影之美', cover: '/images/theme-light.jpg', count: 20 }
    ],
    
    // 年份数据
    yearList: [
      { year: 2025, count: 15, cover: '/images/year-2025.jpg' },
      { year: 2024, count: 43, cover: '/images/year-2024.jpg' },
      { year: 2023, count: 38, cover: '/images/year-2023.jpg' },
      { year: 2022, count: 27, cover: '/images/year-2022.jpg' },
      { year: 2021, count: 22, cover: '/images/year-2021.jpg' }
    ],
    
    // 地理位置数据
    locationList: [
      { id: 1, name: '深圳', cover: '/images/location-shenzhen.jpg', count: 32 },
      { id: 2, name: '杭州', cover: '/images/location-hangzhou.jpg', count: 28 },
      { id: 3, name: '西藏', cover: '/images/location-xizang.jpg', count: 16 },
      { id: 4, name: '广州', cover: '/images/location-guangzhou.jpg', count: 24 },
      { id: 5, name: '北京', cover: '/images/location-beijing.jpg', count: 24 },
      { id: 6, name: '天津', cover: '/images/location-tianjing.jpg', count: 18 }
    ]
  },

  onLoad() {
    // 初始化加载
  },

  // 切换标签页
  switchTab(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      activeTab: index
    })
  },

  // 跳转到主题详情页
  navigateToThemeDetail(e) {
    const { id, name } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/works/theme-detail/theme-detail?id=${id}&name=${encodeURIComponent(name)}`
    })
  },

  // 跳转到年份作品集
  navigateToYearDetail(e) {
    const { year } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/works/year-detail/year-detail?year=${year}`
    })
  },

  // 跳转到地点作品集
  navigateToLocationDetail(e) {
    const { id, name } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/works/location-detail/location-detail?id=${id}&name=${encodeURIComponent(name)}`
    })
  },

  // 用户分享
  onShareAppMessage() {
    return util.getShareConfig('海风影像馆-摄影作品集', '/pages/works/works')
  },
  
  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '海风影像馆-摄影作品集',
      imageUrl: this.data.themeList[0].cover
    }
  }
}) 