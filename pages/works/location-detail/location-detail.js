// location-detail.js
Page({
  data: {
    id: null,
    name: '',
    works: []
  },
  
  onLoad(options) {
    const { id, name } = options
    this.setData({ 
      id,
      name: decodeURIComponent(name || '')
    })
  }
}) 