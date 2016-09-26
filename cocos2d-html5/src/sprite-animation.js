var SpriteAnimation = cc.Sprite.extend({

    fps: 15,
    loop: true,
    frames: [],
    time: 0,
    onAnimationEnd: null,
    _sprite: null,
    _lastFrame: null,

    ctor: function (fps, loop, frames) {
        this._super();
        this.fps = fps;
        this.loop = loop;
        this.frames = frames;
        this.scheduleUpdate();
    },

    update: function (dt) {
        this.time += dt;
        var totalIndex = Math.floor(this.time * this.fps);
        if (this.loop || totalIndex < this.frames.length) {
            var index = totalIndex % this.frames.length;
            var frame = this.frames[index];
            if (frame !== this._lastFrame) {
                this._lastFrame = frame;
                this.setSpriteFrame(frame);
            }
        }
        else {
            this.pause();
            if (this.onAnimationEnd) {
                this.onAnimationEnd();
            }
        }
    }
});
