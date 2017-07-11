/*
 * ------------------------------------------
 * 修改密码模块基类实现文件
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
  '{pro}widget/form/editpwd.js',
  '{pro}cache/user.js',
], function (_k, _e, _t0, _t1, _m, _u, EditPwd,_du, _p, _o, _f, _r) {
  // variable declaration
  var _pro;
  //初始化用户信息
  var _userid = _u._$getJsonDataInStorage("_id");
  var _token = _u._$getJsonDataInStorage("token");
  /**
   * 项目模块基类对象
   * @class   {_$$ModuleLogin}
   * @extends {_$$Module}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$ModuleHomeEditpwd = _k._$klass();
  _pro = _p._$$ModuleHomeEditpwd._$extend(_m._$$Module);
  /**
   * 构建模块
   * @return {Void}
   */
  _pro.__doBuild = function () {

    this.__super();
    this.__body = _e._$html2node(
      _t0._$getTextTemplate('module-id-d11')
    );
    this.__data = {};
    this.__data.userCache = _du._$$User._$allocate();
    this.__data.userCache._$addEvent('editpwd', this.__cbEditPwd._$bind(this));
  };
  _pro.__onRefresh = function (_options) {
    this.__super(_options);
    if (this.__EditPwd) {
      this.__EditPwd.destroy();
    }
    this.__EditPwd = new EditPwd({}).$on('submit', (function (_data) {
      _data.userid = _userid;
      _data.token = _token;
      this.__data.userCache._$editPwd({data: _data});
    })._$bind(this)).$inject(this.__body);
  };
  _pro.__cbEditPwd = function (_json) {
    this.__EditPwd._$cbEditPwd(_json);
  };
  // notify dispatcher
  _t1._$regist('home-editpwd', _p._$$ModuleHomeEditpwd);

})
;
