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
        
        btnEffect:cc.AudioClip
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // cc.director.loadScene("bounceGame");
         this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            cc.audioEngine.playEffect(this.btnEffect);
            cc.log("score text touch");
            cc.director.loadScene("start");
         }, this.node);
        
 
     },

    // update (dt) {},
});
