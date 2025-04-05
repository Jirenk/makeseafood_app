// index.js
Component({
  data: {
    searchValue: '',
    recommendItems: [
      {
        id: 1,
        name: '清蒸鲈鱼',
        cuisine: '粤菜',
        difficulty: '简单',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 2,
        name: '红烧大虾',
        cuisine: '川菜',
        difficulty: '中等',
        image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 3,
        name: '葱姜蒸扇贝',
        cuisine: '鲁菜',
        difficulty: '简单',
        image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 4,
        name: '椒盐基围虾',
        cuisine: '粤菜',
        difficulty: '中等',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 5,
        name: '清蒸扇贝',
        cuisine: '粤菜',
        difficulty: '简单',
        image: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 6,
        name: '清蒸大闸蟹',
        cuisine: '苏菜',
        difficulty: '中等',
        image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 7,
        name: '蒜蓉蒸虾',
        cuisine: '粤菜',
        difficulty: '简单',
        image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 8,
        name: '糖醋鲈鱼',
        cuisine: '浙菜',
        difficulty: '中等',
        image: 'https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      }
    ]
  },
  methods: {
    // 搜索输入
    onSearchInput(e) {
      this.setData({
        searchValue: e.detail.value
      });
    },
    
    // 搜索确认
    onSearchConfirm(e) {
      const searchValue = e.detail.value;
      wx.navigateTo({
        url: `/pages/search/search?keyword=${searchValue}`
      });
    },
    
    // 查看更多 - 跳转到发现页面
    onMoreTap() {
      wx.navigateTo({
        url: '/pages/recommended/recommended',
        success: function() {
          console.log('成功跳转到当季推荐页面');
        },
        fail: function(err) {
          console.error('跳转失败:', err);
        }
      });
    },
    
    // 菜谱项点击
    onRecipeTap(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/recipe-detail/recipe-detail?id=${id}`
      });
    },
    
    // 底部导航点击 - 更新跳转功能
    onTabTap(e) {
      const tabIndex = e.currentTarget.dataset.index;
      const tabsUrl = [
        '/pages/index/index',
        '/pages/recommended/recommended',
        '/pages/recognize/recognize',
        '/pages/seafood-recipes/seafood-recipes',
        '/pages/profile/profile'
      ];
      
      if (tabIndex !== 0) { // 不是当前页
        if (tabIndex === 1) { // 跳转到发现页面
          wx.navigateTo({
            url: tabsUrl[tabIndex],
            success: function() {
              console.log('成功跳转到发现页面');
            },
            fail: function(err) {
              console.error('跳转失败:', err);
            }
          });
        } else {
          // 其他导航项处理
          wx.navigateTo({
            url: tabsUrl[tabIndex]
          });
        }
      }
    },
    
    // 生命周期函数
    attached() {
      console.log('首页加载完成');
    }
  }
})
