define([
  'text!./list.comment.html',
  '{pro}util/util.js',
  '{pro}util/validate.js',
  '{pro}lib/regular.js',
  '{pro}widget/common/confirm.js'
], function (tpl, _u, Validator, _, Confirm) {

  var ListComment = Regular.extend({
    name: 'r-list-comment',
    template: tpl,
    data: {
      validateRules: [{
        field: 'content',
        rules: [{
          type: 'isRequired',
          message: '内容不能为空'
        }]
      }]
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
    addComment: function () {
      var data = this.data;
      var _content = data.content;
      if (this.validate('content', _content)) {
        var _data = {
          content: _content,
        }
        this.$emit('submitComment', _data);
      }
    },
    delItem: function (_id) {
      if(this.data.confirm){
        this.data.confirm.destroy();
      }
      this.data.confirm = new Confirm({
        data: {
          msg: '确定删除？'
        }
      }).$on('confirm', (function () {
        var _data = {
          commentid: _id
        };
        this.$emit('delComment', _data)
      }).bind(this)).$inject(this.$refs.comment);
    }


  }).filter("format", function (value, format) {

    (function () {
      var fix = function (str) {
        str = "" + (str || "");
        return str.length <= 1 ? "0" + str : str;
      }
      var maps = {
        'yyyy': function (date) {
          return date.getFullYear()
        },
        'MM': function (date) {
          return fix(date.getMonth() + 1);
        },
        'dd': function (date) {
          return fix(date.getDate())
        },
        'HH': function (date) {
          return fix(date.getHours())
        },
        'mm': function (date) {
          return fix(date.getMinutes())
        }
      };

      var trunk = new RegExp(Object.keys(maps).join('|'), 'g');

      format = format || "yyyy-MM-dd HH:mm";
      value = new Date(value);

      return format.replace(trunk, function (capture) {
        return maps[capture] ? maps[capture](value) : "";
      });
    })();
  });

  return ListComment;
})
;