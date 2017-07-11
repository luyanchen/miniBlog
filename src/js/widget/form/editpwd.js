define([
  'text!./editpwd.html',
  '{pro}util/util.js',
  '{pro}util/validate.js',
  '{pro}lib/regular.js',
], function (tpl, _u, Validator, _) {
  var EditPwd = Regular.extend({
    name: 'r-editpwd',
    template: tpl,
    data: {
      validateRules: [{
        field: 'oldpwd',
        rules: [{
          type: 'isRequired',
          message: '原密码不能为空'
        }]
      }, {
        field: 'pwd',
        rules: [{
          type: 'isRequired',
          message: '密码不能为空'
        }]
      }, {
        field: 'repwd',
        rules: [{
          type: 'isRequired',
          message: '重复密码不能为空'
        }]
      }],
    },
    init: function (data) {
      data.validator = new Validator(this.data.validateRules);
      console.log(data)
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
      var _oldpwd = data.oldpwd, _pwd = data.pwd, _repwd = data.repwd;
      if (this.validate('oldpwd', _oldpwd) && this.validate('pwd', _pwd) && this.validate('repwd', _repwd)) {
        if (_pwd !== _repwd) {
          data.msg = "两次密码不一致";
          this.$update();
          return;
        }
        var _data = {
          pwd: _pwd,
          oldpwd: _oldpwd,
        };
        this.$emit('submit', _data);
      }
    },
    _$cbEditPwd: function (_json) {
      var _code = _json && _json.code;
      var data = this.data;
      if (_code == 200) {
        data.success = true;
        data.msg = "修改成功";
        window.setTimeout(function(){
          location.href = '/login';
        },3000);
      } else {
        data.msg = _json.error;
      }
      this.$update();
    }
  });

  return EditPwd;
});