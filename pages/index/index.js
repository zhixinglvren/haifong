const util = require('../../utils/util.js')
const auth = require('../../utils/auth.js')

Page({
  data: {
    bannerList: [
      {
        id: 1,
        imageUrl: '/images/banner1.jpg',
        title: '城市之光'
      },
      {
        id: 2,
        imageUrl: '/images/banner2.jpg',
        title: '自然纪实'
      },
      {
        id: 3,
        imageUrl: '/images/banner3.jpg',
        title: '人文生活'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true
  },

  onLoad() {
    // 从服务器获取轮播图数据
    this.fetchBannerData()
  },

  onShow() {
    // 每次显示页面时，检查一下全局数据状态
    const app = getApp()
    this.setData({
      hasUserInfo: app.globalData.hasUserInfo
    })
  },

  // 从服务器获取轮播图数据（示例方法，实际应用中需要对接接口）
  fetchBannerData() {
    // 这里模拟网络请求，实际应用中应该调用wx.request
    setTimeout(() => {
      // 假设这是从服务器获取的数据
      const bannerData = [
        {
          id: 1,
          imageUrl: '/images/banner1.jpg',
          title: '城市之光'
        },
        {
          id: 2,
          imageUrl: '/images/banner2.jpg',
          title: '自然纪实'
        },
        {
          id: 3,
          imageUrl: '/images/banner3.jpg',
          title: '人文生活'
        },
        {
          id: 4,
          imageUrl: '/images/banner4.jpg',
          title: '微距世界'
        },
        {
          id: 5,
          imageUrl: '/images/banner5.jpg',
          title: '黑白时光'
        }
      ]

      this.setData({
        bannerList: bannerData
      })
    }, 500)
  },

  // 跳转到视频号
  navigateToVideoChannel() {
    // 打开视频号
    wx.navigateToMiniProgram({
      appId: 'wxee0933bd3f3fd899', // 视频号填入实际的视频号小程序appId
      path: 'pages/video/video',
      extraData: {
        // 额外参数，可根据需要添加
        channel: 'haifonphoto'
      },
      success(res) {
        console.log('打开视频号成功', res)
      },
      fail(err) {
        console.error('打开视频号失败', err)
        wx.showToast({
          title: '打开视频号失败',
          icon: 'none'
        })
      }
    })
  },

  // 点击轮播图，跳转到作品详情
  onBannerTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/works/work-detail/work-detail?id=${id}`
    })
  },

  // 用户分享
  onShareAppMessage() {
    return util.getShareConfig('海风影像馆-专业摄影作品集', '/pages/index/index')
  },
  
  // 用户分享朋友圈
  onShareTimeline() {
    return {
      title: '海风影像馆-专业摄影作品集',
      imageUrl: this.data.bannerList[0].imageUrl
    }
  }
}) 