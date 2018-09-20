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
        food: {
          default: null,
          type: cc.Prefab,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
      var self = this;
      cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,

          onTouchBegan: function(touch, event) {
              var x = touch.getLocation().x;
              var y = touch.getLocation().y;
              console.log("Click");
              for (var i = 0; i < 50; i++) {
                var node = cc.instantiate(self.food);
                node.setPosition(cc.p(x,y));
                node.parent = self.node;
              }
              return true
          },
          onTouchMoved: function(touch, event) {
              // x = touch.getLocation().x
              // y = touch.getLocation().y

              return true
          },
          onTouchEnded: function(touch, event) {
              // x = touch.getLocation().x
              // y = touch.getLocation().y

              return true
          }
      }, self.node);
    },

    start () {

    },

    // update (dt) {},
});
