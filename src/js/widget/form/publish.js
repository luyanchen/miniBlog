define([
  'text!./publish.html',
  '{pro}util/util.js',
  '{pro}util/validate.js',
  '{pro}lib/regular.js',
], function (tpl, _u, Validator, _) {
  var Publish = Regular.extend({
    name: 'r-editpwd',
    template: tpl,
    data: {
      validateRules: [{
        field: 'title',
        rules: [{
          type: 'isRequired',
          message: '标题不能为空'
        }]
      }, {
        field: 'content',
        rules: [{
          type: 'isRequired',
          message: '内容不能为空'
        }]
      }],
    },
    init: function (data) {
      data.validator = new Validator(this.data.validateRules);
    },
    validate: function (str, value) {
      var data = this.data;
      var result;
      value = value || '';
      value = value.trim();

      this.hideErr();
      //验证字段
      result = data.validator.validate(str, value);
      if (result && !result.success) {
        data.msg = result.result[str].message;
        return false;
      }
      return true;
    },

    //清空提示语
    hideErr: function () {
      this.data.msg = '';//提示语置空
    },
    //登录
    submit: function () {
      var data = this.data;
      var _title = data.title, _content = data.content;
      if (this.validate('title', _title) && this.validate('content', _content)) {
        var _data = {
          title: _title,
          content: _content,
        };
        this.$emit('submit', _data);
      }
    },
    _$cbAddBlog: function (_json) {
      var _code = _json && _json.code;
      var data = this.data;
      if (_code == 200) {
        data.success = true;
        data.msg =  "发布成功";
        window.setTimeout((function(){
          data.msg = '';
          location.href="#/m/index/detail/?blogid="+_json.result.blogid;
        })._$bind(this),1000);
      } else {
        data.msg = _json.error;
      }
      this.$update();
    }
  });

  return Publish;
});