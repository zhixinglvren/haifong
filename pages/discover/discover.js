// discover.js
const util = require('../../utils/util.js')
const auth = require('../../utils/auth.js')

Page({
  data: {
    // 摄影百科数据
    wikiData: [
      {
        id: 1,
        title: '器材宝典',
        desc: '专业器材参数对比与选购指南',
        icon: '/images/icon-equipment.png',
        path: '/pages/discover/wiki/equipment'
      },
      {
        id: 2,
        title: '光影实验室',
        desc: '布光技巧与模拟器',
        icon: '/images/icon-light.png',
        path: '/pages/discover/wiki/light-lab'
      }
    ],
    
    // 教程专栏数据
    courseData: [
      {
        id: 1,
        title: '手机摄影30天',
        desc: '从入门到精通，每日打卡学习',
        cover: '/images/course-mobile.jpg',
        progress: 0,
        path: '/pages/discover/course/mobile-photo'
      },
      {
        id: 2,
        title: 'PS魔法课',
        desc: '照片处理专业技巧',
        cover: '/images/course-ps.jpg',
        progress: 0,
        path: '/pages/discover/course/ps-magic'
      }
    ],
    
    // 互动社区数据
    communityData: [
      {
        id: 1,
        title: '城市夜景摄影大赛',
        desc: '5月15日截止提交',
        cover: '/images/community-city.jpg',
        participants: 128,
        path: '/pages/discover/community/photo-contest'
      },
      {
        id: 2,
        title: '春日花卉摄影挑战',
        desc: '分享你拍摄的春天花卉',
        cover: '/images/community-flower.jpg',
        participants: 256,
        path: '/pages/discover/community/photo-challenge'
      }
    ]
  },

  onLoad() {
    this.checkUserProgress()
  },
  
  // 检查用户学习进度
  checkUserProgress() {
    const app = getApp()
    if (app.globalData.hasUserInfo) {
      // 从本地存储获取学习进度
      const mobileCourseProgress = wx.getStorageSync('mobile_course_progress') || 0
      const psCourseProgress = wx.getStorageSync('ps_course_progress') || 0
      
      let courseData = this.data.courseData
      courseData[0].progress = mobileCourseProgress
      courseData[1].progress = psCourseProgress
      
      this.setData({
        courseData
      })
    }
  },

  // 跳转到详情页
  navigateTo(e) {
    const { path } = e.currentTarget.dataset
    
    // 检查是否为需要授权的页面
    if (path.includes('/course/') || path.includes('/community/')) {
      auth.checkAndNavigate(path, true)
    } else {
      wx.navigateTo({
        url: path
      })
    }
  },

  // 用户分享
  onShareAppMessage() {
    return util.getShareConfig('海风影像馆-摄影知识与社区', '/pages/discover/discover')
  },
  
  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '海风影像馆-摄影知识与社区',
      imageUrl: this.data.courseData[0].cover
    }
  }
})