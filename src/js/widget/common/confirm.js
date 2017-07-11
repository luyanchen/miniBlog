define([
  'text!./confirm.html',
  '{pro}lib/regular.js',
], function (tpl,_) {

  var Confirm = Regular.extend({
    name: 'r-confirm',
    template: tpl,
    cancel: function(){
      this.destroy();
    },
    confirm: function(){
      this.$emit('confirm');
      this.destroy();
    }
  });
  return Confirm;
})
;