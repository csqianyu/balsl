
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    
    onLoad:function(){
    
        var act1 = this.node.runAction(cc.scaleTo(1, 0.8, 0.8));
        var act2 = this.node.runAction(cc.scaleTo(1, 1, 1));
        var seq1 = cc.sequence(act1, act2);
        this.schedule(function(){

            cc.repeatForever(this.node.runAction(seq1))
        },2)
    },


    update:function(){
     
   
       
},
   
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == "bollSprite") {
           selfCollider.node.destroy();
        }
    }

});
