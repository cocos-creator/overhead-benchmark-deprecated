var DustCtrl = cc.Class.extend({
    normalSpeed: -300,

    ctor: function (target) {
        this._dust = null;
        this._target = target;
        this._bindedPlayDustEffect = this.playDustEffect.bind(this);
    },

    createDust: function () {
        var dust = this._dust = new SpriteAnimation(12, false, canvas.dustSpriteFrames);
        this._target.parent.addChild(dust);
        dust.setScale(-1.2, 0.9);
        dust.flippedX = true;
        dust.setAnchorPoint(0.2, 0.2);
        dust.setOpacity(150);
        dust.setLocalZOrder(-1);
        dust.onAnimationEnd = this._bindedPlayDustEffect;
        this.playDustEffect();
    },

    destroyDust: function () {
        this._dust.onAnimationEnd = null;
        this._dust.removeFromParent();
    },

    playDustEffect: function () {
        var dust = this._dust;
        dust.time = 0;
        dust.resume();
        dust.setPosition(this._target.getPosition());
    }
});