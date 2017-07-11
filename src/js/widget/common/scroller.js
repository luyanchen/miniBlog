define([
  'text!./scroller.html',
  '{pro}lib/regular.js',
  '{pro}util/util.js'
], function (tpl, _, _u) {

  var Scroller = Regular.extend({
    name: 'r-confirm',
    template: tpl,
    data: {
      touchStart: 0,
      touchDis: 0,
      showLoading: false
    },
    init: function (data) {
      /*设置wrapper最小高度为设备高度*/
      data.wrapperStyle = 'min-height:' + window.screen.height + 'px';
      this.$update();
    },
    onTouchStart: function (ev) {
      if (ev.event.targetTouches) {
        var touch = ev.event.targetTouches[0];
        this.data.touchStart = touch.pageY;
      }
    },
    onTouchMove: function (ev) {
      if (ev.event.targetTouches) {
        var touch = ev.event.targetTouches[0], wrapper = this.$refs.wrapper,
          data = this.data;
        data.touchDis = touch.pageY - data.touchStart;
        if (data.touchStart < _u._$getWindowHeight() && data.touchDis > 20) {
          data.scrollerStyle = 'margin-top' + (touch.pageY - data.touchStart) + 'px';
          data.showLoading = true;
        }
      }
    },
    onTouchEnd: function (ev) {
      if (ev.event.targetTouches) {
        var data = this.data;
        if (data.touchStart < _u._$getWindowHeight() && data.touchDis > 20) {
          this.$emit("pullDown");
        }
        //上拉
        window.setTimeout((function(){
          var data = this.data;
          if (data.touchDis < 0 && _u._$getScrollTop() + _u._$getWindowHeight() + 300 > _u._$getScrollHeight()) {
            this.$emit("pullUp");
          }
        })._$bind(this),100);
      }
    },
  });
  return Scroller;
});