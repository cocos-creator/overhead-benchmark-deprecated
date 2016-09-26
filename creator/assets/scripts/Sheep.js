var SpriteAnimation = require('SpriteAnimation');

var Sheep = cc.Class({
    extends: cc.Component,

    properties: {
        dustPrefab: cc.Prefab,

        _myDust: {
            default: null,
            serializable: false
        }
    },

    onEnable () {
        this._myDust = cc.instantiate(this.dustPrefab);
        this._myDust.parent = this.node.parent;
        this._myDust.zIndex = -1;
        this._myDust.on(SpriteAnimation.EVENT_END, this.playDustEffect, this);
        this.playDustEffect();

        var sroller = this.getComponent('Scroller');
        sroller.left = this.node.parent.convertToNodeSpaceAR(cc.visibleRect.left).x - 100;
        sroller.right = this.node.parent.convertToNodeSpaceAR(cc.visibleRect.right).x + 250;
    },

    onDisable () {
        this._myDust.off(SpriteAnimation.EVENT_END, this.playDustEffect, this);
        this._myDust.destroy();
    },

    playDustEffect () {
        var dust = this._myDust;
        var dustAnim = dust.getComponent(SpriteAnimation);
        dustAnim.time = 0;
        dustAnim.enabled = true;
        dust.position = this.node.position;
    }
});
