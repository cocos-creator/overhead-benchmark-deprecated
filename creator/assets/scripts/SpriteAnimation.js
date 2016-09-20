var Class = cc.Class({
    extends: cc.Component,
    editor: {
        requireComponent: cc.Sprite
    },

    properties: {
        fps: 15,
        loop: true,
        frames: [cc.SpriteFrame],

        time: {
            default: 0,
            visible: false,
            serializable: false
        },
        _sprite: {
            default: null,
            serializable: false
        },
    },

    statics: {
        EVENT_END: 'sprite-animation-end'
    },

    onLoad: function () {
        this._sprite = this.getComponent(cc.Sprite);
    },

    update: function (dt) {
        this.time += dt;
        var totalIndex = Math.floor(this.time * this.fps);
        if (this.loop || totalIndex < this.frames.length) {
            var index = totalIndex % this.frames.length;
            var frame = this.frames[index];
            if (this._sprite.spriteFrame !== frame) {
                this._sprite.spriteFrame = frame;
            }
        }
        else {
            this.enabled = false;
            this.node.emit(Class.EVENT_END);
        }
    }
});
