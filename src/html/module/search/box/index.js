/*
 * ------------------------------------------
 * 发表博客模块基类实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
NEJ.define([
  'base/klass',
  'base/element',
  'base/util',
  'util/template/tpl',
  'util/dispatcher/module',
  'pro/module/module',
  '{pro}widget/common/search.js',
  '{pro}util/util.js'
], function (_k, _e,_ub, _t0, _t1, _m, Search, _u, _p) {
  // variable declaration
  var _pro;
  /**
   * 项目模块基类对象
   * @class   {_$$ModuleLogin}
   * @extends {_$$Module}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$ModuleSearchBox = _k._$klass();
  _pro = _p._$$ModuleSearchBox._$extend(_m._$$Module);
  /**
   * 构建模块
   * @return {Void}
   */
  _pro.__doBuild = function () {
    this.__super();
    this.__body = _e._$html2node(
      _t0._$getTextTemplate('module-id-d12')
    );
    if (!this.__Search) {
      this.__Search = new Search({
        data: {
          keyword: ''
        }
      }).$on('search', (function (search) {
        location.href = location.href.split('?')[0] + '?keyword='+search;
      })._$bind(this)).$inject(this.__body);
    }
  };

  _pro.__onRefresh = function (_options) {
    this.__super(_options);
    this.__options = _options;

    this.__Search.data.keyword = this.__options.param.keyword || '';
    this.__Search.$update();
  };

  // notify dispatcher
  _t1._$regist('search-box', _p._$$ModuleSearchBox);
});
