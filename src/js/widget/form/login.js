define([
  'text!./login.html',
  '{pro}util/util.js',
  '{pro}util/validate.js',
  '{pro}lib/regular.js',
], function (tpl, _u, Validator, _) {

  var Login = Regular.extend({
    name: 'r-login',
    template: tpl,
    data: {
      validateRules: [{
        field: 'phone',
        rules: [{
          type: 'isRequired',
          message: '手机号不能为空'
        }, {
          type: 'isPhone',
          message: '请输入正确的手机号'
        }]
      }, {
        field: 'pwd',
        rules: [{
          type: 'isRequired',
          message: '密码不能为空'
        }]
      }
      ]
    },
    init: function () {
      this.data.validator = new Validator(this.data.validateRules);
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
    login: function ($event) {
      var data = this.data;
      var _phone = data.phone, _pwd = data.pwd;
      if (this.validate('phone', _phone) && this.validate('pwd', _pwd)) {
        var _data = {
          phone: _phone,
          pwd: _pwd
        }
        this.$emit('login', _data);
      }
    }
  });

  return Login;
});