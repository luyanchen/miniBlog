/*
 * ------------------------------------------
 * 登录模块基类实现文件
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
  '{pro}util/util.js',
  '{pro}widget/form/login.js',
  '{pro}cache/user.js',
], function (_k, _e, _t0, _t1, _m, _u, Login, _du, _p) {
  // variable declaration
  var _pro;
  /**
   * 项目模块基类对象
   * @class   {_$$ModuleLogin}
   * @extends {_$$Module}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$ModuleLogin = _k._$klass();
  _pro = _p._$$ModuleLogin._$extend(_m._$$Module);
  /**
   * 构建模块
   * @return {Void}
   */
  _pro.__doBuild = function () {
    this.__super();
    this.__body = _e._$html2node(
      _t0._$getTextTemplate('module-id-d0')
    );
    this.__data = {};
    this.__data.userCache = _du._$$User._$allocate();
    this.__data.userCache._$addEvent('login', this.__cbLogin._$bind(this));
  };
  _pro.__onRefresh = function (_options) {
    this.__super(_options);
    if (this.__Login) {
      this.__Login.destroy();
    }
    this.__Login = new Login({}).$on('login', (function (_data) {
      this.__data.userCache._$login({data: _data});
    })._$bind(this)).$inject(this.__body);

  };
  _pro.__cbLogin = function (_json) {
    var _code = _json && _json.code;
    if (_code == 200) {
      _u._$setJsonDataInStorage(_json.result);
      location.href = "/index/";
    } else {
      this.__Login.data.msg = _json.error;
      this.__Login.$update();
    }
  };

  // notify dispatcher
  _t1._$regist('login', _p._$$ModuleLogin);
});
