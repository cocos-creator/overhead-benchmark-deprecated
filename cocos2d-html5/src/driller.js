var Driller = (function () {

    function getDir (node) {
        var degree_cw = node.rotation;
        var down = cc.p(0, -1);
        return cc.pRotateByAngle(down, cc.p(0, 0), -degree_cw * Math.PI / 180);
    }

    function initParticle (particle) {
        // failed export plist from creator...
        particle.duration = -1;
        particle.emissionRate = 10;
        particle.life = 0.4;
        particle.lifeVar = 0;
        particle.totalParticles = 5;
        particle.startColor = cc.color(243, 220, 159, 255);
        particle.startColorVar = cc.color(0, 0, 0, 0);
        particle.endColor = cc.color(201, 155, 11, 0);
        particle.endColorVar = cc.color(0, 0, 0, 0);
        particle.angle = 0;
        particle.angleVar = 0;
        particle.startSize = 350;
        particle.startSizeVar = 50;
        particle.endSize = 200;
        particle.endSizeVar = 0;
        particle.startSpin = 0;
        particle.startSpinVar = 0;
        particle.endSpin = 0;
        particle.endSpinVar = 0;
        particle.sourcePos = cc.p(0, 0);
        particle.posVar = cc.p(0, 0);
        particle.positionType = cc.ParticleSystem.TYPE_GROUPED;
        particle.emitterMode = cc.ParticleSystem.MODE_GRAVITY;
        particle.gravity = cc.p(0, 0);
        particle.speed = 400;
        particle.speedVar = 0;
        particle.tangentialAccel = 0;
        particle.tangentialAccelVar = 0;
        particle.radialAccel = 0;
        particle.radialAccelVar = 0;
        particle.rotationIsDir = false;
        particle.setBlendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    var Driller = cc.Node.extend({
        target: null,
        velocity: 200,
        angleVelocity: 60,
        effectCount: 0.2,

        ctor: function (target) {
            this._super();

            this.target = target;

            var body = new cc.Sprite();
            this.addChild(body);
            //var driller = createScaledSprite(, 'driller', 86, 153);
            var drillerSpriteFrame = new cc.SpriteFrame(res.driller, cc.rect(0, 22, 86, 153), false, cc.p(0, -6));
            body.setSpriteFrame(drillerSpriteFrame);

            if (benchmark) {
                var canPlayEffect = (benchmark.currentCount % Math.floor(1 / this.effectCount) === 0);
                if (canPlayEffect) {
                    //var effect = new cc.Node();
                    var effect = new cc.ParticleSystem(res.atom);
                    effect.x = 8;
                    effect.y = 63;
                    effect.rotation = -90;
                    effect.zIndex = -1;
                    initParticle(effect);
                    this.addChild(effect);
                }
            }

            this.scheduleUpdate();
        },

        update: function (dt) {
            // look at player
            var targetPos = this.target.getPosition();
            var selfPos = this.getPosition();
            var expectedDir = cc.pNormalize(cc.pSub(targetPos, selfPos));
            var selfDir = getDir(this);
            var isLeft = cc.pCross(expectedDir, selfDir) > 0;
            if (isLeft) {
                this.rotation += this.angleVelocity * dt;
            }
            else {
                this.rotation -= this.angleVelocity * dt;
            }

            // move forward
            var speed = cc.pMult(getDir(this), this.velocity * dt);
            this.setPosition(cc.pAdd(selfPos, speed));
        }
    });

    return Driller;
})();
