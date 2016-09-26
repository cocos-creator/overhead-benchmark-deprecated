function createScaledSprite (parent, key, sizeOrWidth, height) {
    var width;
    if (typeof sizeOrWidth === 'object') {
        height = sizeOrWidth.height;
        width = sizeOrWidth.width;
    }
    else {
        width = sizeOrWidth;
    }
    var resInfo = res[key];
    var sprite;
    if (Array.isArray(resInfo)) {
        sprite = new cc.Sprite(resInfo[0], cc.rect.apply(null, resInfo[1]));
        sprite.scaleX = width / resInfo[1][2];
        sprite.scaleY = height / resInfo[1][3];
    }
    else {
        sprite = new cc.Sprite(resInfo);
        sprite.scaleX = width / sprite.getTexture().width;
        sprite.scaleY = height / sprite.getTexture().height;
    }
    parent.addChild(sprite);
    return sprite;
}

function createScale9Sprite (parent, key, sizeOrWidth, height) {
    var resInfo = res[key];
    var sprite = new cc.Scale9Sprite(resInfo[0]);
    sprite.setContentSize(sizeOrWidth, height);
    var insets = resInfo[1];
    sprite.setInsetTop(insets[0]);
    sprite.setInsetBottom(insets[1]);
    sprite.setInsetLeft(insets[2]);
    sprite.setInsetRight(insets[3]);
    parent.addChild(sprite);
    return sprite;
}
