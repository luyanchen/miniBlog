var express = require('express');
var router = express.Router();

var code =  require('../models/db.js').code;
var user =  require('../models/db.js').user;


//获取验证码
router.get('/user/code', function(req, res) {
  var _phone = req.query.phone||'';
  //产生验证码
  var _random = new Array(0,1,2,3,4,5,6,7,8,9);//随机数
  var _code = '';
  for(var i = 0; i < 6; i++) {//循环操作
    var index = Math.floor(Math.random()*10);//取得随机数的索引（0~35）
    _code += _random[index];//根据索引取得随机数加到code上
  }
  var _data = {"phone":_phone,"code":_code};
  //console.log(code)
  //查询是否已有该号码

  code.findOne({phone:_phone}).then(function(doc){
    console.log(doc);
    if(doc){
      //更新数据库
      code.update({_id:doc._id},{$set:{"code":_code}}).then(function(obj){
        var _errorinfo = '',_errorcode = 200;
        if(!obj.ok) {
          _errorinfo = "系统繁忙，请稍后重试";
          _errorcode = 501;
          console.log('保存失败')
        }
        //返回json
        var _result = {
          "data":{
            "code":_code
          },
          "code":_errorcode,
          "error":_errorinfo
        }
        res.send(_result);
      });
    }else{
      //插入数据库
      //console.log(_data)
      var iCode = new code({"phone":_phone,"code":_code});
      iCode.save(function(err){
        console.log(err)
        var _errorinfo = '',_errorcode = 200;
        if (err) {
          _errorinfo = "系统繁忙，请稍后重试";
          _errorcode = 501;
          console.log('保存失败');
        }
        //返回json
        var _result = {
          "data":{
            "code":_code
          },
          "code":_errorcode,
          "error":_errorinfo
        }
        res.send(_result);
      });
    }
  });

});

//验证验证码
router.post('/user/verifycode', function(req, res) {
  var _phone = req.body.phone||'';
  var _code = req.body.code||'';

  code.count({phone:_phone,code:_code}).then(function(doc){
    //console.log(doc);
    var _errorinfo = '',_errorcode = 200,_Access = true;
    if(doc == 0){
      _errorinfo = "验证码错误";
      _errorcode = 201;
      _Access = false;
    }
    //返回json
    var _result = {
      "data":{
        "Access":_Access
      },
      "code":_errorcode,
      "error":_errorinfo
    }
    res.send(_result);
  });

});
//注册
router.post('/user/register', function(req, res) {
  var _phone = req.body.phone||'';
  var _nickname = req.body.nickname;
  var _sex = req.body.sex;
  var _password = req.body.pwd;

  var _headimg = 'http://'+req.headers.host+'/images/headimg'+Math.floor(Math.random()*10)+'.png'
  console.log({phone:_phone,password:_password})

  user.findOne({phone:_phone}).then(function(doc){
    var _errorinfo = '',_errorcode = 200,_Access = true;
    console.log(doc);
    if(doc){
      _errorinfo = "该号码已注册";
      _errorcode = 201;
      _Access = false;
    }else{
      //console.log({"phone":_phone,"nickname":_nickname,"password":_password,"sex":_sex,"token":"","headimg":_headimg});

      var iUser = new user({"phone":_phone,"nickname":_nickname,"password":_password,"sex":_sex,"token":"","headimg":_headimg});
      iUser.save(function(err){
        var _errorinfo = '',_errorcode = 200;
        if (err) {
          _errorinfo = "系统繁忙，请稍后重试";
          _errorcode = 501;
          //	console.log('保存失败');
        }
      });
    }
    //返回json
    var _result = {
      "data":{
        "Access":_Access,
      },
      "code":_errorcode,
      "error":_errorinfo
    }
    res.send(_result);

  });

});
//登陆
router.post('/user/login', function(req, res) {
  var _phone = req.body.phone||'';
  var _password = req.body.pwd;
  console.log({phone:_phone,password:_password})
  user.findOne({phone:_phone,password:_password}).then(function(doc){
    var _errorinfo = '',_errorcode = 200,_token = '';
    console.log(doc);
    if(doc == null){
      _errorinfo = "账号或密码错误";
      _errorcode = 201;
    }else{
      //生成token
      var _random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
        'S','T','U','V','W','X','Y','Z');//随机数
      for(var i = 0; i < 10; i++) {//循环操作
        var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
        _token += _random[index];//根据索引取得随机数加到code上
      }
      //更新token
      user.update({_id:doc._id},{$set:{token:_token}},function(err){
        console.log(err);
        var _errorinfo = '',_errorcode = 200;
        if (err){
          _errorinfo = "系统繁忙，请稍后重试";
          _errorcode = 501;
          console.log('保存失败');
        }
      });
      doc.token = _token;
    }

    //返回json
    var _result = {
      "data":doc,
      "code":_errorcode,
      "error":_errorinfo
    }
    res.send(_result);
  });

});



module.exports = router;
