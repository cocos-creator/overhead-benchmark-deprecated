var Scroller = cc.Layer.extend({
    speed: 0,
    left: 0,
    right: 0,
    ctor: function (speed, left, right) {
        this._super();

        this.speed = speed;
        this.left = left;
        this.right = right;

        this.scheduleUpdate();
    },

    update: function (dt) {
        var x = this.x;

        x += this.speed * dt;
        if (x < this.left) {
            x += (this.right - this.left);
        }
        else if (x > this.right) {
            x -= (this.right - this.left);
        }

        this.x = x;
    }
});
