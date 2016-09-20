// horizontal scroller
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        left: -1100,
        right: 0
    },

    update (dt) {
        var x = this.node.x;

        x += this.speed * dt;
        if (x < this.left) {
            x += (this.right - this.left);
        }
        else if (x > this.right) {
            x -= (this.right - this.left);
        }

        this.node.x = x;
    }
});
