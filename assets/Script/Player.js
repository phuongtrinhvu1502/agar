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

    convertMouseCoords:function()
    {
      // cc.Director.getInstance();
      var scale = cc.director.getContentScaleFactor;
      // var origin = cc.EGLView.getViewPortRect;
      // mouse.getLocation.x= origin.origin.x;
      // mouse.getLocation().y -= origin.origin.y;
      // mouse.getLocation().x /= scale;
      // mouse.getLocation().y /= scale;
      // var location = mouse.getLocation();
      // // work out proportion into screen of mouse coords, then apply to world dimensions to get “proper” touch location
      // size = cc.Director.getInstance().getWinSize();
      // var propX = location.x / origin.width;
      // var propY = location.y / origin.height;
      // location.x = size.width * propX;
      // location.y = size.height * propY;
      // console.log(location);
      // return location;
      console.log(cc.EGLView);
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
                    self.abc123 = event.getLocationInView();
                    console.log("getLocationInView: x: " + self.abc123.x + ", y: " + self.abc123.y);
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
        // this.convertMouseCoords();
        // this.node.rotation = 45;
    },

    start: function () {
      // this.rb.applyForce(this.speed, cc.p(500,319));
      console.log(this.rb);
      // console.log(cc.Impulse);

    },

    update: function (dt) {
        // var vX = Math.sin(this.node.rotation * Math.PI / 180) * this.speed;
        // var vY = Math.cos(this.node.rotation * Math.PI / 180) * this.speed;
        // try {
        //   this.node.x = this.abc123.x;
        //   this.node.y = this.abc123.y;
        // } catch(e){
        //
        // }



        var point = cc.p(this.diff.x, this.diff.y);
        point = this.node.parent.convertToWorldSpaceAR(point);
        this.rb.linearVelocity = point;

        // this.convertMouseCoords();

    },


});
