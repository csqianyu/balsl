var ball=require("bounceGame")
cc.Class({
    extends: cc.Component,

    properties: {
      boll:{
          default:null,
          type:cc.Sprite,
      }
    },

 

    update (dt) {
        
     
       
        this.node.position = this.boll.node.position;
        cc.log("拖尾位置为："+this.node.position);
   
    }
   
});
