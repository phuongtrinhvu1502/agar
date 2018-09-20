var Helpers = require('Helpers')


cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad: function () {
        var colorAry = Helpers.getRandomColor()
        this.node.color = new cc.Color(colorAry[0], colorAry[1], colorAry[2])
    },

    Eaten: function() {
      this.node.x += 2000;
      var self = this;
      setTimeout(function () {
        self.node.x -= 2000;
      }, 2000);
    },


});
