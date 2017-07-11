/*
 * ------------------------------------------
 * 项目模块基类实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
  'base/klass',
  'base/element',
  'util/dispatcher/module'
], function (_k, _e, _t, _p, _o) {
  // variable declaration
  var _pro;
  /**
   * 项目模块基类对象
   * @class   {_$$Module}
   * @extends {_$$AbstractModule}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$Module = _k._$klass();
  _pro = _p._$$Module._$extend(_t._$$ModuleAbstract);
  /**
   * 从地址中解析出UMI信息
   * @return {String} UMI信息
   */
  _pro.__doParseUMIFromOpt = (function () {
    var _reg0 = /\?|#/,
      _reg1 = /^\/m\//i;
    return function (_options) {
      var href = _options.href.split(_reg0)[1];
      _options = (_options.input || _o).location || _options;
      switch (href) {
        case '/tab/':
          //APP底部tab：默认/index/list/
          return (_options.href || '/index/list/').split(_reg0)[0].replace(_reg1, '/');
        case '/blog/tab/':
          //首页顶部tab：默认/index/list/?class=1；
          _options.href = '/index/list/' + '?' + (_options.href.split(_reg0)[1] || 'class=1');
          return _options.href;

        default:
          return (_options.href || '/index/list/').split(_reg0)[0].replace(_reg1, '/');
      }
    };
  })();

  _pro.__redirect = function(_umi){
    var _umi = _umi;
    this.__dispatcher._$redirect(_umi);
  };

  /**
   * 显示加载中状态
   * @param  {Object} 事件信息
   */
  _pro.__showLoading = function(_event,_message){
    _message = _message || '';
    _event.value = '<span class="u-load">'+_message+'</span>';
  };
  /**
   * 显示提示信息
   * @param  {Object} 事件信息
   */
  _pro.__showEmpty = function(_event, _message){
    _message = _message || '没有数据！';
    _event.value = '<div class="u-tips"><div class=" active">' + _message + '</div></div>';
  };

  _pro.__getElement = function (className) {
    var elements = this.__body && _e._$getByClassName(this.__body, className);
    return elements && elements[0];
  };

  return _p;
});
