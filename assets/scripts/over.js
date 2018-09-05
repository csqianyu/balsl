cc.Class({
    extends: cc.Component,

    properties: {
      
        gameButton:{
            default:null,
            type:cc.Button,
        },

        ButtonLabel:{
            default:null,
            type:cc.Node,
        },
        overEffect:cc.AudioClip,
       
    },

    // use this for initialization
    onLoad: function () {
      
        // 文字层
      
        var action1 = cc.repeatForever(cc.sequence(cc.scaleTo(1,0.8,0.8),cc.scaleTo(1,1,1)));
        this.ButtonLabel.runAction(action1);
        cc.audioEngine.playEffect(this.overEffect);
        //this.gameButton.runAction(action);
        var bt=this.node.getChildByName("gameButton");
        cc.log("按钮名称"+this.gameButton.name);
       
    },

   
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

