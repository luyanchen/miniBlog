define([
    'base/klass',
    'util/cache/abstract'
],function(_k,_d,_p,_pro){
    /**
     * 项目缓存基类
     */
    _p._$$Cache = _k._$klass();
    _pro = _p._$$Cache._$extend(_d._$$CacheListAbstract);
    
    _pro.__cbListLoad = function(_key,_callback,_json){
        _callback(_json);
    };
    return _p;
});