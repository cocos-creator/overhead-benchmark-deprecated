var ExtraLogic = cc.Node.extend({
    loopCount: 500,
    _sum: 0,
    ctor: function () {
        this._super();
        this.scheduleUpdate();
    },

    update: function (dt) {
        this._sum = 0;
        for (var i = 0; i < this.loopCount; i++) {
            ++this._sum;
        }
    },
});
