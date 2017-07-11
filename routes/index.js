var express = require('express');
var router = express.Router();
var code = require('../models/db.js').code;
var user = require('../models/db.js').user;
var blog = require('../models/db.js').blog;
var comment = require('../models/db.js').comment;

/*
 //设置跨域访问
 router.all('*', function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "X-Requested-With");
 res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
 res.header("X-Powered-By",'3.2.1')
 res.header("Content-Type", "application/json;charset=utf-8");
 next();
 });
 */



//获取验证码
router.get('/login/code', function (req, res) {
  var _phone = req.query.phone || '';
  //产生验证码
  var _random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);//随机数
  var _code = '';
  for (var i = 0; i < 6; i++) {//循环操作
    var index = Math.floor(Math.random() * 10);//取得随机数的索引（0~35）
    _code += _random[index];//根据索引取得随机数加到code上
  }
  var _data = {"phone": _phone, "code": _code};
  //console.log(code)
  //查询是否已有该号码

  code.findOne({phone: _phone}).then(function (doc) {
    console.log(doc);
    if (doc) {
      //更新数据库
      code.update({_id: doc._id}, {$set: {"code": _code}}).then(function (obj) {
        var _errorinfo = '', _errorcode = 200;
        if (!obj.ok) {
          _errorinfo = "系统繁忙，请稍后重试";
          _errorcode = 501;
          console.log('保存失败')
        }
        //返回json
        var _result = {
          "result": {
            "code": _code
          },
          "code": _errorcode,
          "error": _errorinfo
        }
        res.send(_result);
      });
    } else {
      //插入数据库
      //console.log(_data)
      var iCode = new code({"phone": _phone, "code": _code});
      iCode.save(function (err) {
        console.log(err)
        var _errorinfo = '', _errorcode = 200;
        if (err) {
          _errorinfo = "系统繁忙，请稍后重试";
          _errorcode = 501;
          console.log('保存失败');
        }
        //返回json
        var _result = {
          "result": {
            "code": _code
          },
          "code": _errorcode,
          "error": _errorinfo
        }
        res.send(_result);
      });
    }
  });

});

//验证验证码
router.post('/login/validateCode', function (req, res) {
  var _phone = req.body.phone || '';
  var _code = req.body.code || '';
  console.log(_phone);
  console.log(_code)

  code.count({phone: _phone, code: _code}).then(function (doc) {
    //console.log(doc);
    var _errorinfo = '', _errorcode = 200, _Access = true;
    console.log(doc)
    if (doc == 0) {
      _errorinfo = "验证码错误";
      _errorcode = 201;
      _Access = false;
    }
    //返回json
    var _result = {
      "result": {
        "Access": _Access
      },
      "code": _errorcode,
      "error": _errorinfo
    }
    res.send(_result);
  });

});
//注册
router.post('/login/register', function (req, res) {
  var _phone = req.body.phone || '';
  var _nickname = req.body.nickname;
  var _sex = req.body.sex;
  var _password = req.body.pwd;

  var _headimg = 'http://' + req.headers.host + '/res/images/headimg' + Math.floor(Math.random() * 10) + '.png'
  console.log({phone: _phone, password: _password})

  user.findOne({phone: _phone}).then(function (doc) {
    var _errorinfo = '', _errorcode = 200, _Access = true;
    console.log(doc);
    if (doc) {
      _errorinfo = "该号码已注册";
      _errorcode = 201;
      _Access = false;
    } else {
      //console.log({"phone":_phone,"nickname":_nickname,"password":_password,"sex":_sex,"token":"","headimg":_headimg});

      var iUser = new user({
        "phone": _phone,
        "nickname": _nickname,
        "password": _password,
        "sex": _sex,
        "token": "",
        "headimg": _headimg
      });
      iUser.save(function (err) {
        var _errorinfo = '', _errorcode = 200;
        if (err) {
          _errorinfo = "系统繁忙，请稍后重试";
          _errorcode = 501;
          //	console.log('保存失败');
        }
      });
    }
    //返回json
    var _result = {
      "result": {
        "Access": _Access,
      },
      "code": _errorcode,
      "error": _errorinfo
    }
    res.send(_result);

  });

});
//登陆
router.post('/login/login', function (req, res) {
  var _phone = req.body.phone || '';
  var _password = req.body.pwd;

  user.findOne({phone: _phone, password: _password}).then(function (doc) {
    var _errorinfo = '', _errorcode = 200, _token = '';

    if (doc == null) {
      _errorinfo = "账号或密码错误";
      _errorcode = 201;
    } else {
      //生成token
      var _random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数
      for (var i = 0; i < 10; i++) {//循环操作
        var index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）
        _token += _random[index];//根据索引取得随机数加到code上
      }
      //更新token
      user.update({_id: doc._id}, {$set: {token: _token}}, function (err) {
        if (err) {
          _errorinfo = "系统繁忙，请稍后重试";
          _errorcode = 501;
          console.log('保存失败');
        }
      });
      doc.token = _token;
    }

    //返回json
    var _result = {
      "result": doc,
      "code": _errorcode,
      "error": _errorinfo
    };
    res.send(_result);
  });

});


//修改密码
router.post('/login/editpwd', function (req, res) {
  var _userid = req.body.userid;
  var _oldpassword = req.body.oldpwd;
  var _password = req.body.pwd;
  var _token = req.body.token;
  user.count({_id: _userid, password: _oldpassword, token: _token}).then(function (num) {
    var _errorinfo = '', _errorcode = 200, _Access = true;
    console.log(num)
    if (num == 0) {
      _errorinfo = "密码错误";
      _errorcode = 201;
      _Access = false;
    } else {
      user.update({_id: _userid}, {$set: {password: _password}}).then(function (obj) {
        console.log(obj)
        if (!obj.ok) {
          _errorinfo = "系统繁忙，请稍后重试";
          _errorcode = 501;
          _Access = false;
        }
      });
    }
    var _result = {
      "result": {
        "Access": _Access
      },
      "code": _errorcode,
      "error": _errorinfo
    }
    res.send(_result);
  });

});
//发表博客
router.post('/blog/add', function (req, res) {
  var _userid = req.body.userid;
  var _headimg = req.body.headimg;
  var _nickname = req.body.nickname;
  var _title = req.body.title;
  var _content = req.body.content;
  var _token = req.body.token;

  //验证token
  user.findOne({_id: _userid, token: _token}).then(function (doc) {
    var _errorinfo = '', _errorcode = 200, _Access = true;
    console.log(doc);
    if (doc == null) {
      _errorinfo = "登陆异常，请重新登陆";
      _errorcode = 201;
      _Access = false;
    } else {
      var iBlog = new blog({
        "authorid": _userid,
        "nickname": _nickname,
        "headimg": _headimg,
        "title": _title,
        "content": _content,
        "accessCount": 0,
        "commentCount": 0,
        "publishTime": Date.parse(new Date())
      });
      //	var iBlog = new blog({"authorid":_userid,"nickname":_nickname,"headimg":_headimg,"title":_title,"content":_content,"accessCount":0,"commentCount":0,"publishTime":Date.parse(new Date()),"increaseid":getNextSequenceValue("counterid")});

      iBlog.save(function (err) {
        var _errorinfo = '', _errorcode = 200;
        if (err) {
          _errorinfo = "系统繁忙，请稍后重试";
          _errorcode = 501;
          //	console.log('保存失败');
        }
      });
    }
    //返回json
    var _result = {
      "result": {
        "Access": _Access,
        "blogid": (iBlog && iBlog._id) || ''
      },
      "code": _errorcode,
      "error": _errorinfo
    }
    res.send(_result);
  });

});
//博客详情
router.get('/blog/detail', function (req, res) {
  var _blogid = req.query.blogid;

  blog.findOne({_id: _blogid}).then(function (doc) {
    var _errorinfo = '', _errorcode = 200;
    console.log(doc);
    if (doc == null) {
      _errorinfo = "该博客已删除或不存在";
      _errorcode = 202;
    } else {
      blog.update({_id: _blogid}, {'$inc': {'accessCount': 1}}).then(function (err) {
        if (err) {
          _errorinfo = "系统繁忙，请稍后重试";
          _errorcode = 501;
        }
      });
    }
    //返回json
    var _result = {
      "result": doc,
      "code": _errorcode,
      "error": _errorinfo
    }
    res.send(_result);
  });

});
//博客列表
router.get('/blog/list', function (req, res) {
  var _userid = req.query.userid || '';
  var _class = req.query.class || '';
  var _keyword = req.query.keyword || '';
  var _limit = parseInt(req.query.limit) || 1000;
  var _offset = parseInt(req.query.offset) || 0;


  const reg = new RegExp(_keyword, 'i'); //不区分大小写
  var _query = {};
  if (_class == 2) {
    //我的
    _query['authorid'] = _userid;

  }
  //模糊匹配
  _query['$or'] = [{"title": {$regex: reg}}, {"nickname": {$regex: reg}}];

  blog.find(_query).sort({'publishTime': -1}).then(function (doc1) {
    blog.find(_query).sort({'publishTime': -1}).limit(_limit).skip(_offset).then(function (doc2) {
      var _errorinfo = '', _errorcode = 200;

      console.log(doc2.length);
      var _result = {
        "result": {
          list: doc2 || [],
          total: doc1.length
        },
        "code": _errorcode,
        "error": _errorinfo
      }
      res.send(_result);
    });
  });

});
//删除评论
router.post('/blog/delete', function (req, res) {
  var _blogid = req.body.blogid;
  var _userid = req.body.userid;
  var _token = req.body.token;

  //验证token
  user.findOne({_id: _userid, token: _token}).then(function (doc) {
    var _errorinfo = '', _errorcode = 200, _Access = true;
    console.log(doc);
    if (doc == null) {
      _errorinfo = "登陆异常，请重新登陆";
      _errorcode = 201;
      _Access = false;
    } else {
      console.log(_blogid)
      blog.remove({_id: _blogid}).then(function (err) {
        var _errorinfo = '', _errorcode = 200, _Access = true;
        //返回json
        if (err) {
          _errorinfo = "系统繁忙，请稍后重试";
          _errorcode = 501;
          _Access = false;
        }
      });

    }
    //返回json
    var _result = {
      "result": {
        "Access": _Access,
      },
      "code": _errorcode,
      "error": _errorinfo
    }
    res.send(_result);
  });

});
//评论列表
router.get('/blog/comment/list/', function (req, res) {
  var _blogid = req.query.blogid;

  comment.find({blogid: _blogid}).then(function (doc) {
    var _errorinfo = '', _errorcode = 200;
    //返回json

    var _result = {
      "result": doc,
      "code": _errorcode,
      "error": _errorinfo
    }
    res.send(_result);
  });

});
//添加评论
router.post('/blog/comment/add/', function (req, res) {
  var _blogid = req.body.blogid;
  var _userid = req.body.userid;
  var _token = req.body.token;
  var _nickname = req.body.nickname;
  var _headimg = req.body.headimg;
  var _content = req.body.content;

  //验证token
  user.findOne({_id: _userid, token: _token}).then(function (doc) {
    var _errorinfo = '', _errorcode = 200, _Access = true;
    console.log(doc);
    if (doc == null) {
      _errorinfo = "登陆异常，请重新登陆";
      _errorcode = 201;
      _Access = false;
    } else {
      var _item = {
        "blogid": _blogid,
        "userid": _userid,
        "nickname": _nickname,
        "headimg": _headimg,
        "content": _content,
        "publishTime": Date.parse(new Date())
      };

      var iComment = new comment(_item);
      iComment.save(function (err) {
        var _errorinfo = '', _errorcode = 200;
        if (err) {
          _errorinfo = "系统繁忙，请稍后重试";
          _errorcode = 501;
          //	console.log('保存失败');
        }

        blog.update({_id: _blogid}, {'$inc': {'commentCount': 1}}).then(function (err) {
          if (err) {
            _errorinfo = "系统繁忙，请稍后重试";
            _errorcode = 501;
          }
        });

      });
      _item._id = iComment._id;
    }
    //返回json
    var _result = {
      "result": _item,
      "code": _errorcode,
      "error": _errorinfo
    }
    res.send(_result);

  });

});
//删除评论
router.post('/blog/comment/delete/', function (req, res) {
  var _blogid = req.body.blogid;
  var _commentid = req.body.commentid;
  var _userid = req.body.userid;
  var _token = req.body.token;

  //验证token
  user.findOne({_id: _userid, token: _token}).then(function (doc) {
    var _errorinfo = '', _errorcode = 200, _Access = true;
    console.log(doc);
    if (doc == null) {
      _errorinfo = "登陆异常，请重新登陆";
      _errorcode = 201;
      _Access = false;
    } else {
      console.log(_commentid)
      comment.remove({_id: _commentid}).then(function (err) {
        var _errorinfo = '', _errorcode = 200, _Access = true;
        //返回json
        if (err) {
          _errorinfo = "系统繁忙，请稍后重试";
          _errorcode = 501;
          _Access = false;
        }
        blog.update({_id: _blogid}, {'$inc': {'commentCount': -1}}).then(function (err) {
          console.log(err + 'del')
          if (err) {
            _errorinfo = "系统繁忙，请稍后重试";
            _errorcode = 501;
          }
        });
      });

    }
    //返回json
    var _result = {
      "result": {
        "Access": _Access,
      },
      "code": _errorcode,
      "error": _errorinfo
    }
    res.send(_result);
  });

});


module.exports = router;
