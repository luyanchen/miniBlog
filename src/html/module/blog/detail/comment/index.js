/*
 * ------------------------------------------
 * 博客评论模块基类实现文件
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
  '{pro}module/module.js',
  '{pro}util/util.js',
  '{pro}cache/blog.js',
  '{pro}widget/list/list.comment.js',
], function (_k, _e,_ub, _t0, _t1, _m, _u,_db,ListComment, _p) {
  // variable declaration
  var _pro;
  var _userid = _u._$getJsonDataInStorage("_id");
  var _token = _u._$getJsonDataInStorage("token");
  var _nickname = _u._$getJsonDataInStorage("nickname");
  var _headimg = _u._$getJsonDataInStorage("headimg");
  /**
   * 项目模块基类对象
   * @class   {_$$ModuleLogin}
   * @extends {_$$Module}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$ModuleBlogDetailComment = _k._$klass();
  _pro = _p._$$ModuleBlogDetailComment._$extend(_m._$$Module);

  /**
   * 构建模块
   * @return {Void}
   */
  _pro.__doBuild = function () {

    this.__super();
    this.__body = _e._$html2node(
      _t0._$getTextTemplate('module-id-d8')
    );
    this.__data = {};
    this.__data.blogCache = _db._$$Blog._$allocate();
    this.__data.blogCache._$addEvent('getBlogCommentList', this.__cbGetBlogCommentList._$bind(this));
    this.__data.blogCache._$addEvent('addBlogComment', this.__cbAddBlogComment._$bind(this));
    this.__data.blogCache._$addEvent('delBlogComment', this.__cbDelBlogComment._$bind(this));
  };
  _pro.__onRefresh = function (_options) {
    this.__super(_options);
    this.__data.blogid = _options.param.blogid;
    this.__doGetBlogCommentList();
  };
  _pro.__doGetBlogCommentList = function () {
    var _data = {
      blogid: this.__data.blogid
    };
    this.__data.blogCache._$getBlogCommentList({data:_data});
  };
  _pro.__cbGetBlogCommentList = function (_json) {
    var _code = _json && _json.code;
    if (_code == 200) {
      var _list = _json.result;
      for(var i=0;i<_list.length;i++){
        //作评论者可删除本人的评论
        if(_list[i].userid == _userid ){
          _list[i].canDelete = true;
        }else{
          _list[i].canDelete = false;
        }
      }
      if (this.__ListComment) {
        this.__ListComment.destroy();
      }
      this.__ListComment = new ListComment({
        data:{
          list: _list
        }
      }).$on('submitComment', (function (_data) {
        _data = _ub._$merge({
          token:_token,
          nickname:_nickname,
          userid:_userid,
          blogid:this.__data.blogid,
          headimg:_headimg
        },_data);
        this.__data.blogCache._$addBlogComment({data: _data});
      })._$bind(this)).$on('delComment', (function (_data) {
        _data = _ub._$merge({
          token:_token,
          userid:_userid,
          blogid:this.__data.blogid,
        },_data);
        this.__data.blogCache._$delBlogComment({data: _data});
      })._$bind(this)).$inject(this.__body);
    }
  };
  _pro.__cbAddBlogComment = function (_json) {
    var _code = _json && _json.code;
    if (_code == 200) {
      this.__doGetBlogCommentList();
    }
  };
  _pro.__cbDelBlogComment = function (_json) {
    var _code = _json && _json.code;
    if (_code == 200) {
      this.__doGetBlogCommentList();
    }
  };
  // notify dispatcher
  _t1._$regist('blog-detail-comment', _p._$$ModuleBlogDetailComment);
});



