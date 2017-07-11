define([
  'base/klass',
  'base/util',
  'util/ajax/xdr',
  '{pro}cache/cache.js'
], function (_k, _u, _j, _d, _p, _pro) {
  _p._$$User = _k._$klass();
  _pro = _p._$$User._$extend(_d._$$Cache);
  /**
   * 用户登录
   * @param  {Object} _options 数据
   */
  _pro._$login = function (_options) {
    var _data = _options && _options.data;
    _j._$request('/login/login', {
      method: 'post',
      type: 'json',
      data: _data || {},
      onload: this._$dispatchEvent._$bind(this, 'login'),
      onerror: this._$dispatchEvent._$bind(this, 'login')
    });
  };
  /**
   * 获取验证码
   * @param  {Object} _options 数据
   */
  _pro._$getCode = function (_options) {
    var _data = _options && _options.data;
    _j._$request('/login/code', {
      method: 'get',
      type: 'json',
      query: _data || {},
      onload: this._$dispatchEvent._$bind(this, 'getCode'),
      onerror: this._$dispatchEvent._$bind(this, 'getCode')
    });
  };
  /**
   * 验证验证码
   * @param  {Object} _options 数据
   */
  _pro._$validateCode = function (_options) {
    var _data = _options && _options.data;
    _j._$request('/login/validateCode', {
      method: 'post',
      type: 'json',
      data: _data || {},
      onload: this._$dispatchEvent._$bind(this, 'validateCode'),
      onerror: this._$dispatchEvent._$bind(this, 'validateCode')
    });
  };
  /**
   * 注册
   * @param  {Object} _options 数据
   */
  _pro._$register = function (_options) {
    var _data = _options && _options.data;
    _j._$request('/login/register', {
      method: 'post',
      type: 'json',
      data: _data || {},
      onload: this._$dispatchEvent._$bind(this, 'register'),
      onerror: this._$dispatchEvent._$bind(this, 'register')
    });
  };
  /**
   * 修改密码
   * @param  {Object} _options 数据
   */
  _pro._$editPwd = function (_options) {
    var _data = _options && _options.data;
    _j._$request('/login/editpwd', {
      method: 'post',
      type: 'json',
      data: _data || {},
      onload: this._$dispatchEvent._$bind(this, 'editPwd'),
      onerror: this._$dispatchEvent._$bind(this, 'editPwd')
    });
  };
  return _p;
});
