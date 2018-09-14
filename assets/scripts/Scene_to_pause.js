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
       
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // cc.director.loadScene("bounceGame");
         this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            cc.director.resume();
            var b = cc.find("Canvas/pause_scene");
            cc.log("节点名字："+b);
            //node.b.active=false;
         }, this.node);
        
 
     },

    // update (dt) {},
});
