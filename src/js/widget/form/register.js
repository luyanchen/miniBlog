define([
  'text!./register.html',
  '{pro}util/util.js',
  '{pro}util/validate.js',
  '{pro}lib/regular.js',
], function (tpl, _u, Validator, _) {

  var Register = Regular.extend({
    name: 'r-register',
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
        field: 'code',
        rules: [{
          type: 'isRequired',
          message: '验证码不能为空'
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
      }, {
        field: 'nickname',
        rules: [{
          type: 'isRequired',
          message: '昵称不能为空'
        }]
      }],
      sex: 0,
      page: 'first'
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
    //获取验证码
    getCode: function ($event) {
      var data = this.data;
      var _phone = data.phone;
      if (this.validate('phone', _phone)) {
        var _data = {
          phone: _phone
        };
        this.$emit('getCode', _data);
      }
    },
    //下一步
    nextPage: function () {
      var data = this.data;
      if (data.page == "first") {
        var _phone = data.phone, _code = data.code;
        if (this.validate('phone', _phone) && this.validate('code', _code)) {
          var _data = {
            phone: _phone,
            code: _code
          };
          this.$emit('validateCode',_data);
        }
      }
      if (data.page == "second") {
        var _pwd = data.pwd, _repwd = data.repwd,_nickname = data.nickname;
        if (this.validate('pwd', _pwd) && this.validate('repwd', _repwd) && this.validate('nickname', _nickname)){
          if( _pwd !== _repwd) {
            data.msg = "两次密码不一致";
            this.$update();
            return;
          }
          data.page = "third";
        }
      }
    },
    //注册
    register: function () {
      var data = this.data;
      var _data = {
        phone: data.phone,
        pwd: data.pwd,
        sex: data.sex,
        nickname: data.nickname
      };
      this.$emit('register',_data);
    },
    //获取验证码回调
    _$cbGetCode:function (_json) {
      var _code = _json && _json.code;
      if (_code == 200) {
        this.data.msg = "验证码发送成功" + " debug:验证码：" + _json.result.code;
      } else {
        this.data.msg = _json.error;
      }
      this.$update();
    },
    //验证验证码回调
    _$cbValidateCode:function (_json) {
      var _code = _json && _json.code;
      var data = this.data;
      if (_code == 200) {
        data.page = "second";
      } else {
        data.msg = _json.error;
      }
      this.$update();
    },
    //提交注册回调
    _$cbRegister: function (_json) {
      //提交注册
      var _code = _json && _json.code;
      var data = this.data;
      if (_code == 200) {
        data.success = true;
        data.msg = "注册成功";
        window.setTimeout(function () {
          location.href = "/login/";
        }, 1000);
      } else {
        data.msg = _json.error;
      }
      this.$update();
    }
  });
  return Register;
})
  ;