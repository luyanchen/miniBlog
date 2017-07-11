/*
 * ------------------------------------------
 * 注册模块基类实现文件
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
  '{pro}widget/form/register.js',
  '{pro}cache/user.js',
], function (_k, _e, _t0, _t1, _m, _u, Register, _du, _p) {
  // variable declaration
  var _pro;
  /**
   * 项目模块基类对象
   * @class   {_$$ModuleLogin}
   * @extends {_$$Module}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$ModuleRegister = _k._$klass();
  _pro = _p._$$ModuleRegister._$extend(_m._$$Module);
  /**
   * 构建模块
   * @return {Void}
   */
  _pro.__doBuild = function () {
    this.__super();
    this.__body = _e._$html2node(
      _t0._$getTextTemplate('module-id-d1')
    );
    this.__data = {};
    this.__data.userCache = _du._$$User._$allocate();
    this.__data.userCache._$addEvent('getCode', this.__cbGetCode._$bind(this));
    this.__data.userCache._$addEvent('validateCode', this.__cbValidateCode._$bind(this));
    this.__data.userCache._$addEvent('register', this.__cbRegister._$bind(this));
  };
  _pro.__onRefresh = function (_options) {
    this.__super(_options);
    if (this.__Register) {
      this.__Register.destroy();
    }
    this.__Register = new Register({
    }).$on('getCode', (function (_data) {
      this.__data.userCache._$getCode({data: _data});
    })._$bind(this)).$on('validateCode', (function (_data) {
      this.__data.userCache._$validateCode({data: _data});
    })._$bind(this)).$on('register', (function (_data) {
      this.__data.userCache._$register({data: _data});
    })._$bind(this)).$inject(this.__body);
  };
  _pro.__cbGetCode = function (_json) {
    this.__Register._$cbGetCode(_json);
  };
  _pro.__cbValidateCode = function (_json) {
    this.__Register._$cbValidateCode(_json);
  };
  _pro.__cbRegister = function (_json) {
    this.__Register._$cbRegister(_json);
  };

  // notify dispatcher
  _t1._$regist('register', _p._$$ModuleRegister);

});
