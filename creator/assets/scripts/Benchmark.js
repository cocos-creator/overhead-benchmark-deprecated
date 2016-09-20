var ExtraLogic = require('ExtraLogic');

var extraMemory = null;

cc.Class({
    extends: cc.Component,

    properties: {

        // expected count of running test cases
        _expectedCount: 100,
        expectedCount: {
            get () {
                return this._expectedCount;
            },
            set (value) {
                this._expectedCount = Math.max(value, 0);

                // start update to change count
                this.enabled = true;
            }
        },

        spawnCountPerSecond: 200,
        testExtraLogic: true,
        reserveExtraMemory: true,

        // actual running test cases
        _runningTestCases: {
            default: [],
            serializable: false
        },
        currentCount: {
            get () {
                return this._runningTestCases.length;
            }
        },
        countLabel: cc.Label,
        spawnObjects: [cc.Node],
    },

    onLoad () {
        G.benchmark = this;
        cc.director.setDisplayStats(true);

        // hide template object
        for (var i = 0; i < this.spawnObjects.length; ++i) {
            this.spawnObjects[i].active = false;
        }

        if (this.reserveExtraMemory) {
            extraMemory = new ArrayBuffer(1024 * 1024 * 100);
        }
    },

    spawn (topLeft, bottomRight) {
        var newNodes = [];
        this._runningTestCases.push(newNodes);
        for (var i = 0; i < this.spawnObjects.length; ++i) {
            var template = this.spawnObjects[i];
            var node = cc.instantiate(template);
            var x = cc.lerp(topLeft.x, bottomRight.x, cc.random0To1());
            var y = cc.lerp(bottomRight.y, topLeft.y, cc.random0To1());
            node.setPosition(x, y); // random position
            node.active = true;
            node.parent = template.parent;
            newNodes.push(node);
        }
        if (this.testExtraLogic) {
            newNodes[0].addComponent(ExtraLogic);
        }
    },

    update (dt) {
        var spawnCount = this.spawnCountPerSecond * dt;
        if (this.currentCount < this._expectedCount) {
            // compute screen range
            var topLeft = cc.Canvas.instance.node.convertToNodeSpaceAR(cc.visibleRect.topLeft);
            var bottomRight = cc.Canvas.instance.node.convertToNodeSpaceAR(cc.visibleRect.bottomRight);
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
                    removeList[i].destroy();
                }
            }
            this.updateCountText();
        }
        else {
            // pause
            this.enabled = false;
        }
    },

    updateCountText () {
        this.countLabel.string = 'Count: ' + this._runningTestCases.length;
    },

    add1 () {
        this.expectedCount += 1;
    },
    sub1 () {
        this.expectedCount -= 1;
    },
    add10 () {
        this.expectedCount += 10;
    },
    sub10 () {
        this.expectedCount -= 10;
    },
    add100 () {
        this.expectedCount += 100;
    },
    sub100 () {
        this.expectedCount -= 100;
    }
});
