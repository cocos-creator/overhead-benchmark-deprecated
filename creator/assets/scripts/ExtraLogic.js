cc.Class({
    extends: cc.Component,

    properties: {
        loopCount: 500,

        _sum: {
            default: 0,
            serializable: false
        }
    },

    update (dt) {
        this._sum = 0;
        for (var i = 0; i < this.loopCount; i++) {
            ++this._sum;
        }
    },
});
