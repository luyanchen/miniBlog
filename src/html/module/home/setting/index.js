/*
 * ------------------------------------------
 * 设置模块基类实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
NEJ.define([
  'base/klass',
  'base/element',
  'base/event',
  'util/template/tpl',
  'util/template/jst',
  'util/dispatcher/module',
  '{pro}module/module.js',
  '{pro}lib/regular.js',
  '{pro}util/util.js',
  '{pro}widget/common/confirm.js'
], function (_k, _e, _v, _t0, _j, _t1, _m, _, _u, Confirm, _p) {
  // variable declaration
  var _pro;
  /**
   * 项目模块基类对象
   * @class   {_$$ModuleLogin}
   * @extends {_$$Module}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$ModuleHomeSetting = _k._$klass();
  _pro = _p._$$ModuleHomeSetting._$extend(_m._$$Module);
  /**
   * 构建模块
   * @return {Void}
   */
  _pro.__doBuild = function () {

    this.__body = _e._$html2node(
      _t0._$getTextTemplate('module-id-d10')
    );
    _j._$render(this.__body, 'settingTemplate');
    var _eLoginout = this.__getElement('j-loginout');
    _v._$addEvent(_eLoginout, 'click', this.__onLoginout._$bind(this));

  };
  _pro.__onLoginout = function () {
    if (this.__Confirm) {
      this.__Confirm.destroy();
    }
    this.__Confirm = new Confirm({
      data: {
        msg: '确定退出？'
      }
    }).$on('confirm', (function () {
      _u._$clearJsonDataInStorage();
      location.href = "/login";
    })._$bind(this)).$inject(this.__body);

  };
  // notify dispatcher
  _t1._$regist('home-setting', _p._$$ModuleHomeSetting);

});
