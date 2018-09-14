// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var resumed = false;
cc.Class({
    extends: cc.Component,

    properties: {
     
        pause_scene:{

            default:null,
            type:cc.Node,
        } 
      
    },

   

    onLoad () {
    
        this.pause_scene.active = false;
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            
        this.pause_scene.active = true;
          cc.log("节点");
            if (resumed) {
                cc.director.pause();
                resumed = false;
                cc.log("resume状态为："+resumed)
            } else {
                cc.director.resume();
                resumed = true;
            } 
          //  cc.director.loadScene("game_pause");
         }, this.node);

    },

    start () {

        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
           // this.pause_scene.active = true;
            // if (resumed) {
            //     cc.director.pause();
            //     resumed = false;
            //     cc.log("resume状态为："+resumed)
            // } else {
            //     cc.director.resume();
            //     resumed = true;
            // } 
            //cc.director.loadScene("game_pause");
         }, this.node);

        
    },

    // update (dt) {},
});
