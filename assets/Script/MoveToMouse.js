// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
      var self = this;
      cc.eventManager.addListener({
          event: cc.EventListener.MOUSE,
            onMouseMove: function(event)
          {
                    self.player_go = true;
                    self.posiX = event.getLocationX();
                    self.posiY = event.getLocationY();
                    // // var dist = cc.pDistance(self.node.position, cc.p(self.posiX - self.size.width / 2, self.posiY - self.size.height / 2));
                    // var angle = Math.atan2(diff.x, diff.y);
                    // self.node.rotation = cc.radiansToDegrees(angle);
          },

        },self.node);
    },

    // start () {
    //
    // },

    update: function (dt) {
      this.node.x = this.posiX;
      this.node.y = this.posiY;
    },
});
