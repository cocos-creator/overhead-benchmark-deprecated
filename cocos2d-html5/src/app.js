var DESIGN_WIDTH = 1000;
var DESIGN_HEIGHT = 1366;

var canvas = null;
var Canvas = cc.Layer.extend({

    sheepSpriteFrames: null,
    scene: null,
    foregroundUI: null,
    mainUI: null,

    ctor: function () {
        this._super();
        canvas = this;

        // init resources
        cc.spriteFrameCache.addSpriteFrames(res.actors);
        this.sheepSpriteFrames = [
            cc.spriteFrameCache.getSpriteFrame('sheep_run_01.png'),
            cc.spriteFrameCache.getSpriteFrame('sheep_run_02.png'),
            cc.spriteFrameCache.getSpriteFrame('sheep_run_03.png'),
            cc.spriteFrameCache.getSpriteFrame('sheep_run_04.png'),
        ];
        this.dustSpriteFrames = [
            cc.spriteFrameCache.getSpriteFrame('fx_fog01.png'),
            cc.spriteFrameCache.getSpriteFrame('fx_fog02.png'),
            cc.spriteFrameCache.getSpriteFrame('fx_fog03.png'),
            cc.spriteFrameCache.getSpriteFrame('fx_fog04.png'),
            cc.spriteFrameCache.getSpriteFrame('fx_fog05.png'),
            cc.spriteFrameCache.getSpriteFrame('fx_fog06.png'),
        ];

        // init canvas
        var size = cc.visibleRect;
        this.setContentSize(size);
        this.setPosition(size.width * 0.5, size.height * 0.5);

        // create children
        this.createSceneContent(this);
        this.mainUI = new cc.Node();
        this.addChild(this.mainUI);
        this.foregroundUI = new cc.Node();
        this.addChild(this.foregroundUI);
        this.createBenchmarkUI(this);

        ///////////////////////////////
        //// 3. add your codes below...
        //// add a label shows "Hello World"
        //// create and initialize a label
        //var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        //// position the label on the center of the screen
        //helloLabel.x = size.width / 2;
        //helloLabel.y = size.height / 2 + 200;
        //// add the label as a child to this layer
        //this.addChild(helloLabel, 5);
        //
        //// add "HelloWorld" splash screen"
        //this.sprite = new cc.Sprite(res.HelloWorld_png);
        //this.sprite.attr({
        //    x: size.width / 2,
        //    y: size.height / 2
        //});
        //this.addChild(this.sprite, 0);

        return true;
    },

    createBackgrounds: function (parent) {
        var backgrounds = new cc.Node('backgrounds');
        backgrounds.setContentSize(parent.getContentSize());
        parent.addChild(backgrounds);

        var marginBottom = 0.3; // 30%
        var width = backgrounds.width;
        var height = backgrounds.height * (1 - marginBottom);
        var bgBlue = createScaledSprite(backgrounds, 'default_sprite_splash', width, height);
        bgBlue.y = backgrounds.height / 2; bgBlue.anchorY = 1;      // align to top
        bgBlue.setColor(cc.color(0, 152, 206));

        var marginTop = 1 - marginBottom;
        width = backgrounds.width;
        height = backgrounds.height * (1 - marginTop);
        var bgBrown = createScaledSprite(backgrounds, 'default_sprite_splash', width, height);
        bgBrown.y = -backgrounds.height / 2; bgBrown.anchorY = 0;   // align to bottom
        bgBrown.setColor(cc.color(211, 183, 109));
    },

    createSky: function (parent) {
        var scroller = new Scroller(-100, -1100, 0);
        scroller.y = -97;
        parent.addChild(scroller);
        createScaledSprite(scroller, 'bg', 1100, 504);
        createScaledSprite(scroller, 'bg', 1100, 504).x = 1100;
        createScaledSprite(scroller, 'bg', 1100, 504).x = 2200;
        createScaledSprite(scroller, 'bg', 1100, 504).x = -1100;
    },

    createGround: function (parent) {
        var scroller = new Scroller(-150, -1100, 0);
        scroller.y = -347;
        parent.addChild(scroller);
        createScale9Sprite(scroller, 'ground', 1100, 652).attr({
            anchorY: 1
        });
        createScale9Sprite(scroller, 'ground', 1100, 652).attr({
            x: 1100,
            anchorY: 1
        });
        createScale9Sprite(scroller, 'ground', 1100, 652).attr({
            x: 2200,
            anchorY: 1
        });
        createScale9Sprite(scroller, 'ground', 1100, 652).attr({
            x: -1100,
            anchorY: 1
        });
    },

    createDriller: function (parent, target) {
        var driller = new Driller(target);
        driller.x = 138;
        driller.y = 328;
        parent.addChild(driller);
    },

    createSheep: function (parent) {
        var sheep = new SpriteAnimation(8, true, this.sheepSpriteFrames);
        sheep.setAnchorPoint(0.5, 0);
        parent.addChild(sheep);
        return sheep;
    },

    createSheepGroup: function (parent) {
        // reuse scroller...
        var scroller = new Scroller(200, -1100, 1100);
        parent.addChild(scroller);
        scroller.left = parent.convertToNodeSpaceAR(cc.visibleRect.left).x - 100;
        scroller.right = parent.convertToNodeSpaceAR(cc.visibleRect.right).x + 250;

        // create sheeps
        var mainSheep = this.createSheep(scroller);
        mainSheep.scaleX = -1;
        mainSheep.setContentSize(170, 115);
        var smallSheep = this.createSheep(mainSheep);
        var anchorOffset = mainSheep.width * mainSheep.anchorX;
        smallSheep.x = 74 + anchorOffset; smallSheep.y = 2; smallSheep.scale = 0.7;
        smallSheep = this.createSheep(mainSheep);
        smallSheep.x = 138 + anchorOffset; smallSheep.y = 3; smallSheep.scale = 0.6;
        smallSheep = this.createSheep(mainSheep);
        smallSheep.x = 202 + anchorOffset; smallSheep.y = 4; smallSheep.scale = 0.5;

        // create dust
        var dustCtrl = new DustCtrl(mainSheep);
        dustCtrl.createDust();

        return scroller;
    },

    createSceneContent: function (parent) {
        var scene = this.scene = new cc.Node('Scene');
        scene.setContentSize(this.getContentSize());
        parent.addChild(scene);

        this.createBackgrounds(scene);
        this.createSky(scene);
        this.createGround(scene);
        //this.createMovingItems(scene);
    },

    createMovingItems: function (topLeft, bottomRight) {
        var parent = this.scene;
        var movingItem = new cc.Node('moving item');
        parent.addChild(movingItem);
        var x = cc.lerp(topLeft.x, bottomRight.x, cc.random0To1());
        var y = cc.lerp(bottomRight.y, topLeft.y, cc.random0To1());
        movingItem.setPosition(x, y); // random position
        var sheeps = this.createSheepGroup(movingItem);
        this.createDriller(movingItem, sheeps);
        return movingItem;
    },

    createScoreItems: function () {
        var mainUI = this.mainUI;
        var scoreIcon = createScaledSprite(mainUI, 'bird0_1', 34, 24);
        scoreIcon.setPosition(-404, 588);
        scoreIcon.setOpacity(100);
        scoreIcon.setCascadeOpacityEnabled(true);
        var text = new cc.LabelBMFont('1024', res.flappybird, 128, cc.TEXT_ALIGNMENT_CENTER);
        text.setPosition(45, 19);
        text.anchorX = 0;
        text.setScale(40 / 50);
        scoreIcon.addChild(text);
        return scoreIcon;
    },

    createGameOverItems: function () {
        var foregroundUI = this.foregroundUI;
        var gameOver = new cc.Node();
        gameOver.setOpacity(100);
        gameOver.setScale(0.5);
        gameOver.setCascadeOpacityEnabled(true);
        foregroundUI.addChild(gameOver);

        var gameOverSprite = createScaledSprite(gameOver, 'gameoverbg', 382, 304);
        gameOverSprite.setVisible(false);

        var button_play = new ccui.Button(res.button_play[0]);
        button_play.y = -107;
        button_play.setPressedActionEnabled(true);
        button_play.addClickEventListener(function () {
            cc.log("Button clicked");
        });
        gameOver.addChild(button_play);

        var gameOverText = new cc.LabelBMFont('Game Over', res.flappybird, 256, cc.TEXT_ALIGNMENT_CENTER);
        gameOverText.setScale(80 / 50);
        gameOverText.y = 84;
        gameOverText.setColor(cc.color(218, 69, 37));
        gameOver.addChild(gameOverText);

        var scoreTitle = new cc.LabelBMFont('score', res.flappybird, 128, cc.TEXT_ALIGNMENT_CENTER);
        scoreTitle.setScale(60 / 50);
        scoreTitle.setPosition(-7, -16);
        scoreTitle.setAnchorPoint(1, 0.5);
        gameOver.addChild(scoreTitle);

        var score = new cc.LabelBMFont('916', res.flappybird, 128, cc.TEXT_ALIGNMENT_CENTER);
        score.setScale(60 / 50);
        score.setPosition(-5, -16);
        score.setAnchorPoint(0, 0.5);
        score.setColor(cc.color(243, 195, 25));
        gameOver.addChild(score);

        return gameOver;
    },

    createBenchmarkUI: function (parent) {
        var benchmarkUI = new cc.Node();
        benchmarkUI.setPosition(754, -534);
        benchmarkUI.setScale(1.8, 2);
        benchmarkUI.setRotation(90);
        parent.addChild(benchmarkUI);
        createScaledSprite(benchmarkUI, 'pipe', 148, 1024);

        var buttons = new cc.Node();
        buttons.setPosition(4, -333);
        buttons.setRotation(-90);
        buttons.setScale(0.555, 0.5);
        benchmarkUI.addChild(buttons);

        function createButton (parent, text, count, x, y) {
            var btn = new ccui.Button(res.default_btn_normal, res.default_btn_pressed);
            btn.setPosition(x, y);
            btn.setScale9Enabled(true);
            btn.setContentSize(100, 40);
            btn.setPressedActionEnabled(true);
            btn.addClickEventListener(function () {
                benchmark.expectedCount += count;
            });
            parent.addChild(btn);
            var btnLabel = new ccui.Text();
            btnLabel.attr({
                string: text,
                font: "25px AmericanTypewriter",
                x: btn.width / 2,
                y: btn.height / 2 + btnLabel.height / 4,
                color: cc.color(0, 0, 0)
            });
            btn.addChild(btnLabel);
        }

        createButton(buttons, '+1', +1, -153, 27);
        createButton(buttons, '-1', -1, -153, -62.7);
        createButton(buttons, '+10', +10, -1, 27);
        createButton(buttons, '-10', -10, -1, -62.7);
        createButton(buttons, '+100', +100, 147, 27);
        createButton(buttons, '-100', -100, 147, -62.7);

        var counts = new ccui.Text();
        counts.attr({
            string: 'Count: 1',
            font: "25px AmericanTypewriter",
            x: -42.6,
            y: -445.5,
            scaleX: 0.5555556,
            scaleY: 0.5,
            rotation: -90,
            anchorX: 0,
            color: cc.color(0, 0, 0)
        });
        benchmarkUI.addChild(counts);
        benchmark.countLabel = counts;
    }
});

var extraMemory = null;
var benchmark = null;

var Benchmark = cc.Scene.extend({
    _expectedCount: 50,
    spawnCountPerSecond: 200,
    testExtraLogic: true,
    reserveExtraMemory: false,

    // actual running test cases
    _runningTestCases: [],

    countLabel: null,
    spawnObjects: [],

    ctor: function () {
        this._super();

        cc.view.setDesignResolutionSize(DESIGN_WIDTH, DESIGN_HEIGHT, cc.ResolutionPolicy.FIXED_HEIGHT);
        // fix canvas alignment...
        if (!cc.sys.isNative) {
            cc.game.container.style.padding = "";
            cc.game.canvas.style.padding = "";
        }

        benchmark = this;
        cc.director.setDisplayStats(true);

        if (this.reserveExtraMemory) {
            extraMemory = new ArrayBuffer(1024 * 1024 * 100);
        }

        var canvas = new Canvas();
        this.addChild(canvas);

        this.scheduleUpdate();
    },

    spawn: function (topLeft, bottomRight) {
        var newNodes = [
            canvas.createMovingItems(topLeft, bottomRight),
            canvas.createGameOverItems(),
            canvas.createScoreItems()
        ];
        this._runningTestCases.push(newNodes);

        for (var i = 1; i < newNodes.length; i++) {
            var node = newNodes[i];
            var x = cc.lerp(topLeft.x, bottomRight.x, cc.random0To1());
            var y = cc.lerp(bottomRight.y, topLeft.y, cc.random0To1());
            node.setPosition(x, y); // random position
        }

        if (this.testExtraLogic) {
            newNodes[0].addChild(new ExtraLogic());
        }
    },

    update: function (dt) {
        var spawnCount = this.spawnCountPerSecond * dt;
        if (this.currentCount < this._expectedCount) {
            // compute screen range
            var topLeft = canvas.scene.convertToNodeSpaceAR(cc.visibleRect.topLeft);
            var bottomRight = canvas.scene.convertToNodeSpaceAR(cc.visibleRect.bottomRight);
            // spawn
            for (var spawnedCount = 0;
                 spawnedCount < spawnCount && this.currentCount < this._expectedCount;
                 ++spawnedCount) {
                this.spawn(topLeft, bottomRight);
            }
            //
            this.updateCountText();
        }
        else if (this.currentCount > this._expectedCount) {
            // destroy
            for (var destroyedCount = 0;
                 destroyedCount < spawnCount && this.currentCount > this._expectedCount;
                 ++destroyedCount) {
                var removeList = this._runningTestCases.pop();
                for (var i = 0; i < removeList.length; ++i) {
                    removeList[i].removeFromParent();
                }
            }
            this.updateCountText();
        }
        else {
            // pause
            this.pause();
        }
    },

    updateCountText: function () {
        this.countLabel.string = 'Count: ' + this._runningTestCases.length;
    }
});

Object.defineProperty(Benchmark.prototype, 'expectedCount', {
    get: function () {
        return this._expectedCount;
    },
    set: function (value) {
        this._expectedCount = Math.max(value, 0);

        // start update to change count
        this.resume();
    }
});
Object.defineProperty(Benchmark.prototype, 'currentCount', {
    get: function () {
        return this._runningTestCases.length;
    }
});
