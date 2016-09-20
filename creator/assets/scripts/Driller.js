function getDir (node) {
    var degree_cw = node.rotation;
    var down = new cc.Vec2(0, -1);
    return down.rotateSelf(-degree_cw * Math.PI / 180);
}

cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node,
        velocity: 5,
        angleVelocity: 5,
        effectCount: 0.2
    },

    onEnable () {
        if (G.benchmark) {
            var canPlayEffect = (G.benchmark.currentCount % Math.floor(1 / this.effectCount) === 0);
            this.node.getChildByName('effect').active = canPlayEffect;
        }
    },

    update (dt) {
        // look at player
        var targetPos = this.target.position;
        var selfPos = this.node.position;
        var expectedDir = targetPos.subSelf(selfPos).normalizeSelf();
        var selfDir = getDir(this.node);
        var isLeft = selfDir.cross(expectedDir) > 0;
        if (isLeft) {
            this.node.rotation += this.angleVelocity * dt;
        }
        else {
            this.node.rotation -= this.angleVelocity * dt;
        }

        // move forward
        var speed = getDir(this.node).mulSelf(this.velocity * dt);
        this.node.position = selfPos.addSelf(speed);
    },

    //onCollisionEnter () {
    //    D.sceneManager.despawn(this);
    //}
});
