# Creator 架构层性能损耗 Benchmark

对比相同的游戏内容下，Creator 额外的架构层在两个平台的性能损耗：
 - Creator Web vs Cocos2d-html5
 - Creator JSB vs Cocos2d-x JSB

为了提高测试例的代表性，本次测试应该
 - 避免测试底层实现缺失或区别较大的模块（例如碰撞检测，UI 自适应）
 - 保证有一定的内存占用和 CPU 开销，而不是单纯跑分拼渲染
 - 包含更多的基本组件，复杂点的场景结构和生命周期逻辑

## 构建 iOS JSB 版本

```
$ cd cocos2d-jsb
$ cocos run -p ios -m release
```

## 构建 Android JSB 版本

```
$ cd cocos2d-jsb
$ cocos run -p android -j 4
```

## 运行 cocos2d-html5 版本

```
$ cd cocos2d-html5
$ cocos run -p web -m release
```
