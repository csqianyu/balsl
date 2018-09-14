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
     
        gametitle:{
            default:null,
            type:cc.Node,
        
        },
        startEffect:cc.AudioClip,

       

    },

   

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        var action1 = cc.repeatForever(cc.sequence(cc.scaleTo(1,0.8,0.8),cc.scaleTo(1,1,1)));
        this.gametitle.runAction(action1);

        // this.current = cc.audioEngine.play(this.audio, false, 0.5);
        // this.node.on(cc.Node.EventType.TOUCH_START,function(event){
        //     //this.node.audio.onDestroy();
        //    cc.audioEngine.stop(this.current);
        //    cc.director.loadScene("bounceGame");
        //  }, this.node);
    },

    start () {
      
        
 
     },


    // update (dt) {},
});
