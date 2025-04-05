// recommended.js
Component({
  data: {
    seasonIndex: 0,
    seasons: ['当季', '春季', '夏季', '秋季', '冬季'],
    seafoodItems: [
      {
        id: 1,
        name: '多宝鱼',
        description: '肉质肥美，鲜嫩清甜',
        seasonTag: '当季最佳',
        bestSeason: '春季3-5月',
        detail: '多宝鱼因其肉质鲜嫩、营养丰富而备受青睐。春季3-5月是多宝鱼最肥美的季节，此时的多宝鱼脂肪含量适中，肉质最为鲜甜。',
        image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 2,
        name: '大闸蟹',
        description: '蟹肉鲜美，蟹黄丰富',
        seasonTag: '秋季珍品',
        bestSeason: '秋季9-11月',
        detail: '秋季是品尝大闸蟹的最佳时节，此时的大闸蟹肉质饱满，蟹黄浓郁。俗话说"秋风起，蟹脚痒"，9-11月的大闸蟹肥美程度达到顶峰。',
        image: 'https://images.unsplash.com/photo-1590759668628-05b0fc34bb70?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 3,
        name: '鲈鱼',
        description: '肉质细嫩，刺少肉多',
        seasonTag: '四季皆宜',
        bestSeason: '冬春季12-3月',
        detail: '鲈鱼全年都适合食用，但冬春季节的鲈鱼肉质更加紧实鲜美。12月至次年3月的鲈鱼肥度适中，鲜甜度最高，是烹饪鲈鱼的最佳时机。',
        image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 4,
        name: '扇贝',
        description: '鲜甜可口，营养丰富',
        seasonTag: '春夏鲜品',
        bestSeason: '春夏季3-7月',
        detail: '春末夏初是食用扇贝的最佳时节，这个时期的扇贝肉质饱满，鲜甜多汁。3-7月的扇贝含有丰富的蛋白质和微量元素，味道最为鲜美。',
        image: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      }
    ]
  },
  methods: {
    // 季节选择变化
    onSeasonChange(e) {
      this.setData({
        seasonIndex: e.detail.value
      });
      console.log(`切换到: ${this.data.seasons[e.detail.value]}`);
      // 这里可以添加按季节筛选数据的逻辑
    },
    
    // 查看食谱详情
    onRecipeTap(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/recipe-detail/recipe-detail?id=${id}`,
        success: function() {
          console.log(`成功跳转到食谱详情页，ID: ${id}`);
        }
      });
    },
    
    // 底部导航点击
    onTabTap(e) {
      const tabIndex = e.currentTarget.dataset.index;
      const tabsUrl = [
        '/pages/index/index',
        '/pages/recommended/recommended',
        '/pages/recognize/recognize',
        '/pages/seafood-recipes/seafood-recipes',
        '/pages/profile/profile'
      ];
      
      if (tabIndex !== 1) { // 不是当前页
        if (tabIndex === 0) { // 跳转到首页
          wx.navigateBack({
            delta: 1,
            success: function() {
              console.log('成功返回首页');
            },
            fail: function() {
              // 如果返回失败(可能不是从首页进入)，则直接跳转
              wx.navigateTo({
                url: tabsUrl[tabIndex],
                success: function() {
                  console.log('成功跳转到首页');
                }
              });
            }
          });
        } else {
          // 其他导航项处理
          wx.navigateTo({
            url: tabsUrl[tabIndex],
            success: function() {
              console.log(`成功跳转到: ${tabsUrl[tabIndex]}`);
            }
          });
        }
      }
    },
    
    // 生命周期函数
    attached() {
      console.log('发现页面加载完成');
    }
  }
}) 