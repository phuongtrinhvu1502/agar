// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Helpers = require('Helpers')
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
        mouse: {
          default: null,
          type: cc.Node,
        },
        camera: {
          default: null,
          type: cc.Camera,
        },
        selfPrefab: {
          default: null,
          type: cc.Prefab,
        },
    },

    // onCollisionEnter: function (other, self) {
    //
    //     // if (other.tag == Helpers.PlayerTag) {
    //     //   console.log("Be eaten");
    //     //     // self.node.destroy();
    //     //       this.node.destroy();
    //     // }
    //     console.log("Collision");
    // },

    onBeginContact(contact, selfCollider, otherCollider) {
      if (otherCollider.tag == Helpers.FoodTag) {
        // otherCollider.node.destroy();
        !otherCollider.node.getComponent("FoodControl").Eaten();
        this.node.height += 1;
        this.node.width += 1;
        this.collider.radius += 0.5;
        this.collider.apply();
        if (this.camera != null) {
          this.camera.zoomRatio -= this.camera.zoomRatio * 0.001;
        }
        // console.log(this.collider);
        // console.log(this.node);
      }
    },

    setInputControl: function() {
      var self = this;
      // var split = cc.instantiate(self.selfPrefab);
      // split.setPosition(cc.p(self.node.x+10, self.node.y+10));
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
              switch (event.keyCode) {
                  case cc.KEY.space:
                      var split = cc.instantiate(self.selfPrefab);
                      split.parent = cc.find("Players");
                      split.x = self.node.x - 50;
                      split.y = self.node.y;
                      split.getComponent("Player").Split();
                      split.getComponent("Player").isMain = false;
                      split.getComponent("Player").main = self.node;
                      console.log("Key space Up");
                      break;
              }
          });
    },

    Split: function() {
      this.isSplit = true;
      setTimeout(function () {
        this.isSplit = false;
      }, 1000);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
      console.log(this.camera);
      this.collider = this.node.getComponent(cc.PhysicsCircleCollider);
      // this.node.on("mousemove", function (event) {
      //   console.log(event.getLocation().x)
      // });
      this.isSplit = false;
      this.isMain = true;
      this.main = null;
      var manager = cc.director.getCollisionManager();
      // Enabled the colider manager.
      manager.enabled = true;
      // Enabled draw collider
      manager.enabledDebugDraw = true;
      cc.director.getPhysicsManager().enabled = true;
      cc.director.getPhysicsManager().debugDrawFlags =
      cc.PhysicsManager.DrawBits.e_aabbBit
    cc.PhysicsManager.DrawBits.e_pairBit |
    cc.PhysicsManager.DrawBits.e_centerOfMassBit |
    cc.PhysicsManager.DrawBits.e_jointBit |
    cc.PhysicsManager.DrawBits.e_shapeBit
    ;
      var self = this;
      cc.eventManager.addListener({
          event: cc.EventListener.MOUSE,
          	onMouseMove: function(event)
        	{
                    self.posInView = event.getLocationInView();
                    if (self.isMain == true) {
                      self.diff = {
                        'x' : self.posInView.x - 479,
                        'y': 319 - self.posInView.y
                      };
                    } else {
                      var x = Math.round(self.node.x - self.main.x);
                      var y = Math.round(self.node.y - self.main.y);
                      // console.log("Position in view: x: " + x + ", y: " + y);
                      console.log("distance x: " + x);
                      console.log("distance y: " + y);
                      self.diff = {
                        'x' : self.posInView.x - (479 + x),
                        'y': (319 - y) - self.posInView.y
                      };
                    }
                    // var dist = cc.pDistance(self.node.position, cc.p(self.posiX - self.size.width / 2, self.posiY - self.size.height / 2));
                    // var angle = Math.atan2(dist.x, dist.y);
                    // self.node.rotation = cc.radiansToDegrees(angle);
        	},

        },self.node);
        // this.size = cc.winSize;
        this.rb = this.getComponent(cc.RigidBody);
        this.setInputControl();
    },

    start: function () {
      // this.rb.applyForce(this.speed, cc.p(500,319));
      console.log(this.rb);
      // console.log(cc.Impulse);
      // for (var i = 0; i < 2000; i++){
      //
      // }
      console.log("Player");
    },

    update: function (dt) {
        // var vX = Math.sin(this.node.rotation * Math.PI / 180) * this.speed;
        // var vY = Math.cos(this.node.rotation * Math.PI / 180) * this.speed;
        // this.node.x += vX;
        // this.node.y += vY;
        // try {
        //   this.node.x = this.abc123.x;
        //   this.node.y = this.abc123.y;
        // } catch(e){
        //
        // }

        try {

          var point = cc.p(this.diff.x, this.diff.y);
          // if (this.isSplit == true) {
          //   point = cc.p(this.diff.x * 2, this.diff.y * 2);
          // }
          this.rb.linearVelocity = point;
        } catch(e) {

        }

        // this.convertMouseCoords();

    },


});
