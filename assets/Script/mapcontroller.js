var Helpers = require('Helpers')

cc.Class({
    extends: cc.Component,

    properties: {
        foodPic:{
            default: null,
            type: cc.SpriteFrame,
        },
        addFoodDt: 2,
        foodPrefab: {
            default: null,
            type: cc.Prefab,
        },
        maxFood: 0,
        canvas: cc.Node,
        foodParent: {
          default: null,
          type: cc.Node,
        }
    },

    // use this for initialization
    onLoad: function () {
        // this.foodPool = new cc.NodePool('foodPool');

        // this.addRandomFood();
        // this.addScaleControl()
        // for (var i = 0 ; i < this.maxFood; i++) {
        //   this.addFood();
        // }
    },

    start: function () {
      // this.rb.applyForce(this.speed, cc.p(500,319));
      for (var i = 0 ; i < this.maxFood; i++) {
        this.addFood();
      }
    },

    addRandomFood: function () {

        var action = cc.repeatForever(cc.sequence(
                cc.delayTime(this.addFoodDt),
                cc.callFunc(function(){

                    this.addFood()
                }, this),
        ))
        this.node.runAction(action)
    },
    addFood: function () {
        // var maxFoodCount = cc.sys.isMobile ? this.maxFood : this.maxFood

        if (this.node.children.length > this.maxFood) {
             return
        }
        // var pad = 20
        // var minX = pad
        // var maxX = this.node.width - pad
        // var minY = pad
        // var maxY = this.node.height - pad
        var x = Helpers.getRandom(-1400, 1400);
        var y = Helpers.getRandom(-700, 700);

        // var node
        // if (this.foodPool.size() > 0) {
        //     node = this.foodPool.get();
        // } else {
          var node = cc.instantiate(this.foodPrefab);
        // }
        // node.x = x;
        // node.y = y;
        // node.parent = this.foodParent;
        // var node = cc.instantiate(self.food);
        node.setPosition(cc.p(x,y));
        node.parent = this.node;
    },

    addScaleControl: function () {

        if (cc.sys.isMobile) {
              this.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                var touches = event.getTouches();
                if (touches.length >= 2) {
                     var touch1 = touches[0], touch2 = touches[1];
                    var delta1 = touch1.getDelta(), delta2 = touch2.getDelta();
                    var touchPoint1 = this.node.convertToNodeSpaceAR(touch1.getLocation());
                    var touchPoint2 = this.node.convertToNodeSpaceAR(touch2.getLocation());
                     var distance = cc.pSub(touchPoint1, touchPoint2);
                    var delta = cc.pSub(delta1, delta2);
                    var scale = 1;
                    if (Math.abs(distance.x) > Math.abs(distance.y)) {
                        scale = (distance.x + delta.x) / distance.x * this.node.scale;
                    }
                    else {
                        scale = (distance.y + delta.y) / distance.y * this.node.scale;
                    }

                   var maxS = 1
                   var minS = 1 / cc.director.Player.node.scale
                   this.node.scale = cc.clampf(scale, minS, maxS)
                }
            }, this);
        } else {
            var listener = {
                event: cc.EventListener.MOUSE,
                onMouseScroll: function (event) {
                   if (event.getScrollY() > 0) {
                        event.currentTarget.scale += 0.01
                   }
                   else{
                        event.currentTarget.scale -= 0.01
                   }
                   var maxS = 1
                   var minS = 1 / cc.director.Player.node.scale
                   event.currentTarget.scale = cc.clampf(event.currentTarget.scale, minS, maxS)
                },
            }
            cc.eventManager.addListener(listener, this.node);
        }


    },






    // update: function (dt) {
    //     // console.log('大小:', this.node.x, this.node.y);
    // },

});
