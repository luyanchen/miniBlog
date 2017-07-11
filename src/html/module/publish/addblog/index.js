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
  'util/template/tpl',
  'util/dispatcher/module',
  '{pro}module/module.js',
  '{pro}lib/regular.js',
  '{pro}util/util.js',
  '{pro}widget/form/publish.js',
  '{pro}cache/blog.js',
], function (_k, _e, _t0, _t1, _m, _, _u, Publish, _db, _p) {
  // variable declaration
  var _pro;
  var _token = _u._$getJsonDataInStorage("token");
  var _nickname = _u._$getJsonDataInStorage("nickname");
  var _userid = _u._$getJsonDataInStorage("_id");
  var _headimg = _u._$getJsonDataInStorage("headimg");
  /**
   * 项目模块基类对象
   * @class   {_$$ModuleLogin}
   * @extends {_$$Module}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$ModulePublishAddblog = _k._$klass();
  _pro = _p._$$ModulePublishAddblog._$extend(_m._$$Module);
  /**
   * 构建模块
   * @return {Void}
   */
  _pro.__doBuild = function () {

    this.__super();
    //textarea 封装模板会和<teaxarea>标签冲突。
    this.__body = _e._$html2node(
      _t0._$getTextTemplate('module-id-d6')
    );

    this.__data = {};
    this.__data.blogCache = _db._$$Blog._$allocate();
    this.__data.blogCache._$addEvent('addBlog', this.__cbAddBlog._$bind(this));
  };
  _pro.__onRefresh = function (_options) {
    this.__super(_options);
    if (this.__Publish) {
      this.__Publish.destroy();
    }
    this.__Publish = new Publish({}).$on('submit', (function (_data) {
      _data.userid = _userid;
      _data.token = _token;
      _data.nickname = _nickname;
      _data.headimg = _headimg;
      this.__data.blogCache._$addBlog({data: _data});
    })._$bind(this)).$inject(this.__body);
  };
  _pro.__cbAddBlog = function (_json) {
    this.__Publish._$cbAddBlog(_json);
  };
  // notify dispatcher
  _t1._$regist('publish-addblog', _p._$$ModulePublishAddblog);
});
