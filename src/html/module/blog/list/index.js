/*
 * ------------------------------------------
 * 首页列表模块实现文件
 * @version  1.0
 * @author   chenluyan_bupt@163.com
 * ------------------------------------------
 */
NEJ.define([
  'base/klass',
  'base/element',
  'base/event',
  'util/chain/chainable',
  'util/template/tpl',
  'util/dispatcher/module',
  'util/list/waterfall',
  '{pro}module/module.js',
  '{pro}util/util.js',
  '{pro}cache/blog.js',
  '{pro}widget/common/confirm.js',
  '{pro}widget/common/scroller.js'
], function (_k, _e, _v, $, _t0, _t1, _ul, _m, _u, _db, Confirm, Scroller, _p) {
  var _pro;
  //初始化用户信息
  var _userid = _u._$getJsonDataInStorage("_id");
  var _token = _u._$getJsonDataInStorage("token");
  var DEFAULT_SIZE = 8;
  var isLoading = false;
  /**
   * 首页列表模块对象
   *
   * @class   {_$$ModuleBlogList}
   * @extends {_$$Module}
   *
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   *
   */
  _p._$$ModuleBlogList = _k._$klass();
  _pro = _p._$$ModuleBlogList._$extend(_m._$$Module);
  /**
   * 构建模块
   * @return {Void}
   */
  _pro.__doBuild = function () {
    this.__super();
    this.__body = _e._$html2node(
      _t0._$getTextTemplate('module-id-d4')
    );

    this.__data = {
      size: DEFAULT_SIZE,
      userid: _userid,
      token: _token
    };
    //初始化scroller
    this.__jScroller = this.__getElement('j-scroller');
    this.__Scroller = new Scroller({
      $body: _t0._$getTextTemplate('listbox')
    }).$on('pullDown', (function () {
      if(!isLoading) {
        this.__list._$refreshWithClear();
      }
    })._$bind(this)).$on('pullUp', (function () {
      if(!isLoading) {
        _v._$dispatchEvent(this.__jUpMore, 'click');
      }
    })._$bind(this)).$inject(this.__jScroller);

    this.__jList = this.__getElement('j-list');
    this.__jUpMore = this.__getElement('j-upmore');

  };

  /**
   * 刷新模块
   * @param  {Object} 配置信息
   * @return {Void}
   */
  _pro.__onRefresh = function (_options) {
    this.__super(_options);
    this.__data.class = _options.param.class || '1';
    this.__data.keyword = _options.param.keyword || '';


    if (this.__list) {
      this.__list._$recycle();
    }

    this.__list = _ul._$$ListModuleWF._$allocate({
      limit: this.__data.size,
      parent: this.__jList,
      more: this.__jUpMore,
      item: {klass: 'listTemplate', data: this.__data, format: _u._$formatDayTime},
      cache: {
        lkey: 'blog-list-' + this.__data.class + '-' + this.__data.keyword,
        data: this.__data,
        klass: _db._$$Blog,
        key: '_id', //list中的id,
        autogc: true
      },
      onafterlistrender: this.__onAfterListRender._$bind(this),
      onbeforelistrender: this.__onBeforeListRender._$bind(this),
      onemptylist: this.__showEmpty._$bind(this),
      ondelete: this.__onDelete._$bind(this),
      onpullrefresh:this._onPullRefresh._$bind(this),
    });
    isLoading = true;

  };

  _pro.__onBeforeListRender = function (_event) {
    var _list = _event.list;
    if (_list.length > 0) {
      for (var i = 0; i < _list.length; i++) {
        if (_list[i]) {
          //可删除本人的博客
          if (_list[i].authorid == _userid) {
            _list[i].canDelete = true;
          } else {
            _list[i].canDelete = false;
          }
        }
      }
    }
  };

  _pro._onPullRefresh = function (_ropt) {
   console.log(_ropt);
  };

  _pro.__onAfterListRender = function () {
    isLoading = false;
  };

  //删除一项的响应函数
  _pro.__onDelete = function (_event) {
    var _id = _event.data._id;
    var _data = {
      _id: _id,
      blogid: _id,
      userid: _userid,
      token: _token
    };
    if (this.__Confirm) {
      this.__Confirm.destroy();
    }
    this.__Confirm = new Confirm({
      data: {
        msg: '确定删除？'
      }
    }).$on('confirm', (function () {
      this.__doDelete(_data);
    })._$bind(this)).$inject(this.__body);
  };

  //删除一项
  _pro.__doDelete = function (_data) {
    this.__list._$delete(_data);
  };


  /**
   * 隐藏模块触发事件，子类实现具体逻辑
   * @protected
   * @return {Void}
   */
  _pro.__onHide = function () {
    this.__super();
    if (this.__list) {
      this.__list._$refreshWithClear();
    }
  };
  // notify dispatcher
  _t1._$regist('blog-list', _p._$$ModuleBlogList);
});


