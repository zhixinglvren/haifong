// year-detail.js
Page({
  data: {
    year: null,
    works: []
  },
  
  onLoad(options) {
    const { year } = options
    this.setData({ year })
  }
}) 