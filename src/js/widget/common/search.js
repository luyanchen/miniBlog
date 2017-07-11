define([
  'text!./search.html',
  '{pro}lib/regular.js',
], function (tpl, _) {

  var Search = Regular.extend({
    name: 'r-search',
    template: tpl,
    init:function(){
      this.$watch('search',function (v) {
        var search = this.data.search;
        this.$emit('search',search);
      });
    }
  });
  return Search;
});