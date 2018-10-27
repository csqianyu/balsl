var pos=require("groundSprite");
var resumed = false;
cc.Class({
    extends: cc.Component,

    properties: {
        // 所有boll是否均落下
        bollDown: false,
        // 是否开始游戏
        isBegin: false,
        // 是否在游戏中
        isActivity: false,
        // 第一个boll是否触底
        isFirstBoll: false,
        // 第一个触底的boll X坐标
        firstBollPositionX: 5,
        // 所有小球计数
        allBolls: 0,
        // 所有触底小球计数
        tampBolls: 0,
        addBolls: 0,
        level: 1,

        // 标记第一个触底boll的boll
        indexBoll: {
            default: null,
            type: cc.Sprite,
        },

        boxPrefab: {
            default: null,
            type: cc.Prefab,
        },

        bollPrefab: {
            default: null,
            type: cc.Prefab,
        },

        lifePrefab: {
            default: null,
            type: cc.Prefab,
        },

        // 地面
        ground: {
            default: null,
            type: cc.Node
        },

        // 轨迹条
        ballLink: {
            default: null,
            type: cc.Sprite,
        },

        levelLabel: {
            default: null,
            type: cc.Label,
        },

        allBollsLabel: {
            default: null,
            type: cc.Label,
        },

        rockAudio: {
            default: null,
            url: cc.AudioClip,
        },

        circleAudio: {
            default: null,
            url: cc.AudioClip,
        },

        ball:{
            default:null,
            type:cc.Node,

        },

        pause_scene:{

            default:null,
            type:cc.Node,
        },
    },

    onLoad () {
        // 开启物理
        cc.director.getPhysicsManager().enabled = true;
        // 开启碰撞
        cc.director.getCollisionManager().enabled = true;
        cc.view.setDesignResolutionSize(800,1280,cc.ResolutionPolicy.EXACT_FIT);
        this.pause_scene.active = false;
        this.indexBoll.node.setPosition(cc.v2(this.firstBollPositionX, -484));
        cc.log("初始化小球的位置"+this.indexBoll.node.position);
        this.ballLink.node.setPosition(cc.v2(this.firstBollPositionX-10, -487));   
        this.ballLink.enabled = false;
        this.ground.getComponent('groundSprite').game = this;
        

        this.initBox();
        this.allBolls = 1;
        this.level = 1;
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            this.touchStart(event);
            
        }.bind(this), this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event){
            this.touchMove(event);            
        }.bind(this), this);

        this.node.on(cc.Node.EventType.TOUCH_END, function(event){
            this.touchEnd(event);
        }.bind(this), this);

        // 生成第一层
        for (var i = 0; i < 6; i++) {
            let isBox = Math.ceil(Math.random() * 10) % 2;
            if (isBox == 1) {
                var newBox = cc.instantiate(this.boxPrefab);
                this.node.addChild(newBox);
                newBox.setPosition(-330 + i * (95 + 15), 450);
                cc.log("box的名字："+newBox.name);
                
                var colorArr = this.hslToRgb(this.level * 0.025, 0.75, 0.65);
                newBox.setColor(cc.color(colorArr[0], colorArr[1], colorArr[2]));
               
            }


        }
        var a = this.node.getChildByName('bt_pause');
        a.on(cc.Node.EventType.TOUCH_START, function(event){
            cc.log("节点名字a为："+a.name);
            if (resumed) {
                // this.pause_scene.removeFromParent();
                // this.node.addChild(pause_scene);
                // cc.log("节点")
                cc.director.pause();
               if (this.node.name == "boxSprite" ||this.node.name == "lifeBox") {
                newBox.opacity=0;
                }
                this.pause_scene.active = true;
                resumed = false;
                cc.log("resume状态为："+resumed);
                this.pause_scene.zIndex=100000;
                
            } 
            else {
                this.pause_scene.active = false;
                cc.director.resume();
                resumed = true;
            } 


        }.bind(this), this);
      
        // if(cc.sys.platform === cc.sys.WECHAT_GAME) {
        //     this.showWxBannerAd();
        // }
    },


    showWxBannerAd(){
        let winSize = wx.getSystemInfoSync();
        let bannerAd = wx.createBannerAd({
            adUnitId: 'adunit-7d927d7bf8b13472',
            style: {
                left: 0,
                top: 0,
                width: 350,
            }
        })
        bannerAd.show()
        bannerAd.onResize(res => {
            bannerAd.style.top = winSize.windowHeight - bannerAd.style.realHeight;
            bannerAd.style.left = (winSize.windowWidth - bannerAd.style.realWidth) * 0.5;
        })
    },

    watchWxVideoAd() {
        let videoAd = wx.createRewardedVideoAd({
            adUnitId: 'adunit-44fb9362d57be189'
        })
        
        videoAd.load()
        .then(() => videoAd.show())
        .catch(err => console.log(err.errMsg))
    },
    
    initBox: function () {   
        this.level ++;
        this.levelLabel.getComponent(cc.Label).string = "等级：" + this.level;
        // 下移box
        if (this.isBegin == true) {
            var childrenNode = this.node.children;
            for (var i = 0; i < childrenNode.length; i++) {
                var node = childrenNode[i];
                if (node.name == "boxSprite" || node.name == "lifeBox") {
                    if (node.position.y <= 450) {
                        node.y -= 100;
                        if (node.y < -350) {
                            this.showGameOver();
                        }
                    }
                }
            }
            // createBox
            var isShowLifeBox = false;
            for (var i = 0; i < 7; i++) {
                let isBox = Math.ceil(Math.random() * 10) % 2;
                if (isBox == 1) {
                    let isLife = Math.ceil(Math.random() * 10) % 2;
                    if (isLife == true && isShowLifeBox == false) {
                        isShowLifeBox = true;
                        var lifeBox = cc.instantiate(this.lifePrefab);
                        lifeBox.setPosition(-330 + i * (95 + 15), 450);
                        this.node.addChild(lifeBox);
                   
                    } else {
                        var newBox = cc.instantiate(this.boxPrefab);
                        var scoreLabel = newBox.children[0];
                        let isDouble = Math.ceil(Math.random() * 10) % 2;
                        if (isDouble == 1) {
                            scoreLabel.getComponent(cc.Label).string = 2 * this.level;
                        } else {
                            scoreLabel.getComponent(cc.Label).string = this.level;
                        }
                        this.node.addChild(newBox);
                        newBox.setPosition(-330 + i * (95 + 15), 450);
                        var colorArr = this.hslToRgb(this.level * 0.025, 0.75, 0.65);
                        newBox.setColor(cc.color(colorArr[0], colorArr[1], colorArr[2]));
                    }
                }
            }

            this.bollDown = false;

        }

            
    },

    touchStart: function (event) {
        this.ballLink.node.setPosition(cc.v2(this.firstBollPositionX-10, -484));
        // test for wx video ad
        // if(cc.sys.platform === cc.sys.WECHAT_GAME) {
        //     this.watchWxVideoAd();
        // }
       
    },

    touchMove: function(event) {
        if (this.isActivity == false) {
            var touchPos= event.touch._point;
            var touchPos = this.node.convertToNodeSpaceAR(touchPos);
            var bollPos=this.ball.getPosition();
            cc.log("触点位置"+touchPos);
            cc.log("小球位置"+this.ball.position);
            var vec=cc.pSub(touchPos,bollPos);
            cc.log("向量为："+vec);
            var angle = cc.pToAngle(vec) / Math.PI * 180;
            cc.log("旋转角度为"+angle);
            this.ballLink.node.setRotation(90-angle);
            this.ball.setRotation(90-angle);
            this.ballLink.enabled = true;
            this.ball.setRotation(90-angle);
           // cc.log("小球setRoatation"+(90-angle));
            if (-80 < this.ballLink.node.rotation && this.ballLink.node.rotation < 75) {
               this.ballLink.enabled = true;
            } else {
                this.ballLink.enabled = false;
            }
        }
        
    },

    touchEnd: function (event) {
        if (this.isActivity == false && this.ballLink.enabled == true) {
            this.ballLink.enabled = false;
            this.allBollsLabel.enabled = false;
            if (this.isBegin == false) {
                this.isBegin = true;
            }
            this.schedule(function(){
                var boll = cc.instantiate(this.bollPrefab);
                this.node.addChild(boll);
                boll.game = this;
                boll.setPosition(cc.v2(this.firstBollPositionX, -484));
                var boxRigidBody = boll.getComponent(cc.RigidBody);
                var angle = -this.ballLink.node.rotation - 270;
                var toX = Math.cos(angle * 0.017453293) * 100;
                var toY = Math.sin(angle * 0.017453293) * 100;
                boxRigidBody.linearVelocity = cc.v2(toX * 17, toY * 17);
            }.bind(this), 0.08, this.allBolls - 1)
            
            this.schedule(function(){
                this.indexBoll.enabled = true;
                cc.log("轨迹位置为："+this.indexBoll.node.position);
                this.isFirstBoll = false;
            }.bind(this), 0.08*(this.allBolls - 1), 1);
            this.isActivity = true;
    
            indexBollP= this.indexBoll.node.getPositionX();
            cc.log("轨迹位置为："+this.indexBollP.position());
            this.ballLink.node.setPosition(cc.v2(this.indexBollP, -484));
        }

        
       
    },

    showGameOver: function () {
        cc.director.loadScene('game_over');
    },

    // start(){
    //     a.on(cc.Node.EventType.TOUCH_START, function(event){
    //         this.pause_scene.active = true;
            
    //     }.bind(this), this);
    // },

    update (dt) {
      
        if (this.bollDown == true) {
            this.initBox();
        }
        
        if(this.isFirstBoll == true) {
           
            this.indexBoll.node.setPosition(cc.v2(this.firstBollPositionX, -486));
           // cc.log("第一个球的位置为："+ this.indexBoll.node.Position());
            this.indexBoll.enabled = true;
        }
    },
    
    hslToRgb: function (h, s, l) {
        var r, g, b;
        if(s == 0) {
            r = g = b = l; // achromatic
        } else {
            var hue2rgb = function hue2rgb(p, q, t) {
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

   

});
