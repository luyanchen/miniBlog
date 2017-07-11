define([
  'base/klass',
  'base/util',
  'util/ajax/xdr',
  '{pro}cache/cache.js'
], function (_k, _u, _j, _d, _p, _pro) {
  _p._$$Blog = _k._$klass();
  _pro = _p._$$Blog._$extend(_d._$$Cache);
  /**
   * 发布博客
   * @param  {Object} _options 数据
   */
  _pro._$addBlog = function (_options) {
    var _data = _options && _options.data;
    _j._$request('/blog/add', {
      method: 'post',
      type: 'json',
      data: _data || {},
      onload: this._$dispatchEvent._$bind(this, 'addBlog'),
      onerror: this._$dispatchEvent._$bind(this, 'addBlog')
    });
  };

  /**
   * 获取博客列表
   * @param  {Object} _options 数据
   */
  _pro.__doLoadList = function (_options) {
    var _onload = _options.onload;
    var _data = _options.data || {};
    _j._$request('/blog/list/', {
      type: 'json',
      data: _data,
      onload: function (_json) {
        _onload(_json.code == 200 ? _json.result : null);
      }
    });
  };
  /**
   * 从博客列表中删除一项
   * @param  {Object} _options 数据
   */
  _pro.__doDeleteItem = function (_options) {
    var _onload = _options.onload;
    var _data = _options.data || {};
    _j._$request('/blog/delete', {
      method: 'post',
      type: 'json',
      data: _data,
      onload: function (_json) {
        _onload(_json.code == 200 ? _json.result : null);
      }
    });
  };
  /**
   * 获取博客详情
   * @param  {Object} _options 数据
   */
  _pro._$getBlogDetail = function (_options) {
    var _data = _options && _options.data;
    _j._$request('/blog/detail', {
      method: 'get',
      type: 'json',
      query: _data || {},
      onload: this._$dispatchEvent._$bind(this, 'getBlogDetail'),
      onerror: this._$dispatchEvent._$bind(this, 'getBlogDetail')
    });
  };
  /**
   * 获取博客评论列表
   * @param  {Object} _options 数据
   */
  _pro._$getBlogCommentList = function (_options) {
    var _data = _options && _options.data;
    _j._$request('/blog/comment/list/', {
      method: 'get',
      type: 'json',
      query: _data || {},
      onload: this._$dispatchEvent._$bind(this, 'getBlogCommentList'),
      onerror: this._$dispatchEvent._$bind(this, 'getBlogCommentList')
    });
  };
  /**
   * 添加博客评论
   * @param  {Object} _options 数据
   */
  _pro._$addBlogComment = function (_options) {
    var _data = _options && _options.data;
    _j._$request('/blog/comment/add/', {
      method: 'post',
      type: 'json',
      data: _data || {},
      onload: this._$dispatchEvent._$bind(this, 'addBlogComment'),
      onerror: this._$dispatchEvent._$bind(this, 'addBlogComment')
    });
  };
  /**
   * 删除博客评论
   * @param  {Object} _options 数据
   */
  _pro._$delBlogComment = function (_options) {
    var _data = _options && _options.data;
    _j._$request('/blog/comment/delete/', {
      method: 'post',
      type: 'json',
      data: _data || {},
      onload: this._$dispatchEvent._$bind(this, 'delBlogComment'),
      onerror: this._$dispatchEvent._$bind(this, 'delBlogComment')
    });
  };
  return _p;
});
