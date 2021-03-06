NEJ.define([
  'util/dispatcher/dispatcher'
], function (_t) {
  /* start up dispatcher */
  _t._$startup({
    rules: {
      rewrite: {
        '404': '/m/index/list/',
      },
      title: {
        '/m/index/list/': '首页',
        '/m/index/detail/': '博客详情',
        '/m/publish/': '发博客',
        '/m/home/list/': '个人中心',
        '/m/home/setting/': '设置',
        '/m/home/editpwd/': '修改密码',
        '/m/search/': '搜索'

      },
      alias: {
        'layout-system-app': '/m',
        'layout-index-list': '/m/index/list/',
        'layout-index-detail': '/m/index/detail/',

        'layout-publish': '/m/publish/',
        'layout-home-list': '/m/home/list/',
        'layout-home-setting': '/m/home/setting/',
        'layout-home-editpwd': '/m/home/editpwd/',

        'layout-search': '/m/search/',


        'system-tab': '/?/tab/',
        //首页：博客列表+类型菜单
        'blog-list': '/?/blog/list/',
        'blog-tab': '/?/blog/tab/',
        //博客详情页：正文+评论
        'blog-detail-content': '/?/blog/detail/content/',
        'blog-detail-comment': '/?/blog/detail/comment/',
        //发博客
        'publish-addblog': '/?/publish/addblog/',
        'home-list': '/?/home/list/',
        'home-setting': '/?/home/setting/',
        'home-editpwd': '/?/home/editpwd/',
        //搜索
        'search-box': '/?/search/box/',
        'search-list': '/?/search/list/'


      }
    },
    modules: {
      /*
       * ------------------------------------------
       * 私有模块
       * ------------------------------------------
       */
      '/?/tab/': 'module/tab/index.html',
      //博客相关
      '/?/blog/list/': 'module/blog/list/index.html',
      '/?/blog/tab/': 'module/blog/tab/index.html',
      '/?/blog/detail/content/': 'module/blog/detail/content/index.html',
      '/?/blog/detail/comment/': 'module/blog/detail/comment/index.html',

      //个人中心相关
      '/?/home/list/': 'module/home/list/index.html',
      '/?/home/setting/': 'module/home/setting/index.html',
      '/?/home/editpwd/': 'module/home/editpwd/index.html',

      //发表博客
      '/?/publish/addblog/': 'module/publish/addblog/index.html',

      //搜索
      '/?/search/box/': 'module/search/box/index.html',
      '/?/search/list/': 'module/search/list/index.html',

      /*
       * ------------------------------------------
       * 对外注册模块
       * ------------------------------------------
       */
      '/m': {
        module: 'module/layout/system/app/index.html',
        composite: {
          tab: '/?/tab/'
        }
      },
      //首页列表
      '/m/index/list/': {
        module: 'module/layout/index.list/index.html',
        composite: {
          tab: '/?/blog/tab/',
          list: '/?/blog/list/'
        }
      },
      //博客正文
      '/m/index/detail/': {
        module: 'module/layout/index.detail/index.html',
        composite: {
          content: '/?/blog/detail/content/',
          comment: '/?/blog/detail/comment/',
        }
      },
      //发布博客
      '/m/publish/': {
        module: 'module/layout/publish/index.html',
        composite: {
          addblog: '/?/publish/addblog/'
        }
      },
      //搜索
      '/m/search/': {
        module: 'module/layout/search/index.html',
        composite: {
          box: '/?/search/box/',
          list: '/?/blog/list/'
        }
      },
      //个人中心
      '/m/home/list/': {
        module: 'module/layout/home.list/index.html',
        composite: {
          list: '/?/home/list/'
        }
      },
      //设置
      '/m/home/setting/': {
        module: 'module/layout/home.setting/index.html',
        composite: {
          setting: '/?/home/setting/'
        }
      },
      //修改密码
      '/m/home/editpwd/': {
        module: 'module/layout/home.editpwd/index.html',
        composite: {
          editpwd: '/?/home/editpwd/'
        }
      },

    },

    onbeforechange: function (_options) {
      var _umi = _options.path || '';
      if (!!_umi &&
        _umi.indexOf('/?') < 0 &&
        _umi.indexOf('/m') < 0)
        _options.path = '/m' + _umi;
    }
  });
});