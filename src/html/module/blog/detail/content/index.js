/*
 * ------------------------------------------
 * 博客正文模块基类实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
NEJ.define([
  'base/klass',
  'base/element',
  'util/template/tpl',
  'util/dispatcher/module',
  'util/template/jst',
  '{pro}module/module.js',
  '{pro}util/util.js',
  '{pro}cache/blog.js',
], function (_k, _e, _t0, _t1, _j, _m, _u, _db, _p) {
  // variable declaration
  var _pro;
  /**
   * 项目模块基类对象
   * @class   {_$$ModuleLogin}
   * @extends {_$$Module}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$ModuleBlogDetailContent = _k._$klass();
  _pro = _p._$$ModuleBlogDetailContent._$extend(_m._$$Module);
  /**
   * 构建模块
   * @return {Void}
   */
  _pro.__doBuild = function () {
    this.__super();
    this.__body = _e._$html2node(
      _t0._$getTextTemplate('module-id-d7')
    );

    this.__data = {};
    this.__data.blogCache = _db._$$Blog._$allocate();
    this.__data.blogCache._$addEvent('getBlogDetail', this.__cbGetBlogDetail._$bind(this));

  };
  /**
   * 刷新模块
   * @param  {Object} 配置信息
   * @return {Void}
   */
  _pro.__onRefresh = function (_options) {
    this.__super(_options);
    var _data = {
      blogid: _options.param.blogid
    };
    this.__data.blogCache._$getBlogDetail({data: _data});

  };
  _pro.__cbGetBlogDetail = function (_json) {
    var _code = _json && _json.code;
    if (_code == 200) {
      _j._$render(this.__body, 'contentTemplate', _json.result);
    }
  };

  // notify dispatcher
  _t1._$regist('blog-detail-content', _p._$$ModuleBlogDetailContent);


});
