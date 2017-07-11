NEJ.define([
    'util/dispatcher/dispatcher'
],function(_t){
/* start up dispatcher */
  _t._$startup({
    rules:{
        rewrite:{
            '404':'/m/login/',
            '/':'/m/login/',
        },
        title:{
            '/m/login/':'登录',
            '/m/register/':'注册',
        },
        alias:{
            'layout-system-login':'/m',
            'layout-login':'/m/login/',
            'layout-register':'/m/register/',

            'login':'/?/login/',
            'register':'/?/register/'
        }
    },
    modules:{
        //私有模块
        '/?/login/':'module/login/index.html',
        '/?/register/':'module/register/index.html',
        
        //对外注册模块
        '/m':'module/layout/system/login/index.html',              
        '/m/login/':{
            module:'module/layout/login/index.html',
            composite:{
                login:'/?/login/'
            }
        },
        '/m/register/':{
            module:'module/layout/register/index.html',
            composite:{
                register:'/?/register/'
            }
        },

      },

      onbeforechange:function(_options){
          var _umi = _options.path||'';
          if (!!_umi&&
                _umi.indexOf('/?')<0&&
                _umi.indexOf('/m')<0)
              _options.path = '/m'+_umi;
      }
  });
});