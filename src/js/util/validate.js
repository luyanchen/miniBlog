define([
  'pro/util/util'
], function (_) {
  var regInt = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
  var regFloat = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;
  var regEmail = /^[\w-\.]+@(?:[\w-]+\.)+[a-z]{2,6}$/i;
  var regUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
  var regWide = /[^\x00-\xff]/g;
  var regPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;

  var Validator = function (fieldRules) {
    this.fieldRules = fieldRules;
  };
  Validator.isEmail = function (value) {
    return regEmail.test(value);
  };
  Validator.isURL = function (value) {
    return regUrl.test(value);
  };
  Validator.isInt = function (value) {
    return regInt.test(value);
  };
  Validator.isFloat = function (value) {
    return regFloat.test(value);
  };
  Validator.isPhone = function (value) {
    return regPhone.test(value);
  };
  //验证API
  var _validate = function (value, rule, data) {
    switch (rule.type) {
      case 'is': {
        return rule.reg.test(value);
      }
      case 'isRequired': {
        return value === 0 || !!value;
      }
      case 'isFilled': {
        return !!value && !!(value.replace(/^\s+/g, "").replace(/\s+$/g, ""));
      }
      case 'isEmail': {
        return Validator.isEmail(value);
      }
      case 'isURL': {
        return Validator.isURL(value);
      }
      case 'isInt': {
        return Validator.isInt(value);
      }
      case 'isFloat': {
        return Validator.isFloat(value);
      }
      case 'isPhone': {
        return Validator.isPhone(value);
      }
      case 'isLength': {
        //var length = isNaN(value) ?  value.replace(regWide, '**').length : value.length;
        var length = value.length;
        return length >= rule.range.min && length <= rule.range.max;
      }
      default: {
        if (typeof(rule.type) == 'function') {
          return rule.type(value, data);
        }
      }

    }
    return result;
  };
  // 验证数据
  var _validateAll = function (data) {
    var conclusion = {
      success: true,
      result: {}
    };
    for (var i = 0; i < this.fieldRules.length; i++) {
      var field = this.fieldRules[i].field,
        rules = this.fieldRules[i].rules;
      if (!rules || !rules.length) continue;
      for (var j = 0; j < rules.length; j++) {
        var rule = rules[j];
        var success = _validate(data[field], rule, data);
        conclusion.success = conclusion.success && success;
        if (!success) {
          conclusion.result[field] = rule;
          break;
        }
      }
    }
    return conclusion;
  };
  // 验证单个字段
  var _validateField = function (field, value) {
    var rules;
    var conclusion = {
      result: {}
    }
    // 获取指定字段对应的验证规则
    for (var i = 0; i < this.fieldRules.length; i++) {
      if (this.fieldRules[i].field === field) {
        rules = this.fieldRules[i].rules;
        break;
      }
    }
    // 使用验证规则验证值
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      conclusion.success = _validate(value, rule);
      if (!conclusion.success) {
        conclusion.result[field] = rule;
        break;
      }
    }
    return conclusion;
  };
  // 验证数据
  Validator.prototype.validate = function (field, value) {
    if (typeof field === 'object') {
      return _validateAll.call(this, field);
    } else {
      return _validateField.call(this, field, value);
    }
  };
  return Validator;
});

