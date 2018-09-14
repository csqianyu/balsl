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

        audio: {
            default: null,
            type: cc.AudioClip
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

      var current = cc.audioEngine.play(this.audio, false, 0.5);
       // cc.director.loadScene("bounceGame");
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            cc.audioEngine.stop(current);
            cc.log("score text touch");
            cc.director.loadScene("bounceGame");
        }, this.node);
       

    },

    // update (dt) {},
});
