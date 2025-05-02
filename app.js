// app.js
App({
  globalData: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    systemInfo: null
  },
  
  onLaunch() {
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync()
    this.globalData.systemInfo = systemInfo
    
    // 检查基础库版本，判断是否可以使用新版获取用户信息接口
    if (wx.getUserProfile) {
      this.globalData.canIUseGetUserProfile = true
    }
    
    // 处理用户授权状态
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              this.globalData.hasUserInfo = true
              
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
}) 