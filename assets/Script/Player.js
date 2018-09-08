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
      speed: 0,
      canvas: {
        default: null,
        type: cc.Node
      },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad: function () {
    // this.node.on("mousemove", function (event) {
    //   console.log(event.getLocation().x)
    // });
    cc.director.getPhysicsManager().enabled = true;
    var self = this;
    cc.eventManager.addListener({
        event: cc.EventListener.MOUSE,
          onMouseMove: function(event)
        {

                  self.player_go = true;
                  self.posiX = event.getLocationX();
                  self.posiY = event.getLocationY();
                  self.diff = {
                    // 'x' : self.posiX - self.size.width / 2 - self.node.position.x,
                    // 'y': self.posiY - self.size.height / 2 - self.node.position.y
                    'x' : self.posiX - self.node.position.x,
                    'y': self.posiY - self.node.position.y
                  };
                  // // var dist = cc.pDistance(self.node.position, cc.p(self.posiX - self.size.width / 2, self.posiY - self.size.height / 2));
                  // var angle = Math.atan2(diff.x, diff.y);
                  // self.node.rotation = cc.radiansToDegrees(angle);
        },

      },self.node);
      this.size = cc.winSize;
      this.rb = this.getComponent(cc.RigidBody);

      // this.node.rotation = 45;
  },

  start: function () {
    // this.rb.applyForce(this.speed, cc.p(500,319));
    console.log(this.rb);
    console.log(cc.Impulse);
  },

  update: function (dt) {
      // var vX = Math.sin(this.node.rotation * Math.PI / 180) * this.speed;
      // var vY = Math.cos(this.node.rotation * Math.PI / 180) * this.speed;
      // this.node.x = this.posiX;
      // this.node.y = this.posiY;
      this.rb.linearVelocity = cc.p(this.diff.x, this.diff.y);
  },
});