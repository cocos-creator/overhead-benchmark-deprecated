var res = {
    default_sprite_splash: "res/sprites/default_sprite_splash.png",
    bg: "res/background/bg.png",
    ground: ["res/background/ground.png", [48, 17, 0, 0]],
    driller: "res/sprites/driller.png",
    atom: "res/effects/atom.plist",
    actors: "res/sprites/actors.plist",
    pipe: "res/sprites/pipe.png",
    flappybird: "res/fonts/flappybird.fnt",
    flappybird_png: "res/fonts/flappybird.png",
    bird0_1: ["res/sprites/bird0_1.png", [6, 13, 34, 24]],
    button_play: ["res/ui/button_play.png", [6, 3, 104, 58]],
    gameoverbg: "res/ui/gameoverbg.png",
    default_btn_disabled: "res/ui/default_btn_disabled.png",
    default_btn_normal: "res/ui/default_btn_normal.png",
    default_btn_pressed: "res/ui/default_btn_pressed.png",
};

var g_resources = [];
(function () {
    for (var i in res) {
        var val = res[i];
        if (Array.isArray(val)) {
            g_resources.push(val[0]);
        }
        else {
            g_resources.push(val);
        }
    }
})();
