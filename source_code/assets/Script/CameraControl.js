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
      target: {
          default: null,
          type: cc.Node
      },
      camera: cc.Camera,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
      let canvas = cc.find('Canvas').getComponent(cc.Canvas);
      this.visibleSize = cc.view.getVisibleSize();
      this.initZoomRatio = this.camera.zoomRatio;
    },
    onEnable: function () {
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
    },
    onDisable: function () {
        cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera);
    },

    lateUpdate: function(dt) {
      let targetPos;
      targetPos = this.target.parent.convertToWorldSpaceAR(this.target.position);
      this.node.position = this.node.parent.convertToNodeSpaceAR(targetPos);
    }

    // start () {
    //
    // },

    // update (dt) {},
});
