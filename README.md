# Creator 架构层性能损耗 Benchmark

对比相同的游戏内容下，Creator 额外的架构层在两个平台的性能损耗：
 - Creator Web vs Cocos2d-html5
 - Creator JSB vs Cocos2d-x JSB

为了提高测试例的代表性，本次测试应该
 - 避免测试底层实现缺失或区别较大的模块（例如碰撞检测，UI 自适应）
 - 保证有一定的<del>内存占用和</del> CPU 开销，而不是单纯跑分拼渲染
 - 包含更多的基本组件，复杂点的场景结构和生命周期逻辑

Issue 地址：https://github.com/cocos-creator/fireball/issues/4097

## 构建 iOS JSB 版本

```
$ cd cocos2d-html5
$ cocos run -p ios -m release
```

### 在 iOS 手机上运行

用 XCode 打开 cocos2d-html5/frameworks/runtime-src/proj.ios_mac/overhead_benchmark.xcodeproj，调整屏幕方向为竖屏并运行。

## 构建 Android JSB 版本

```
$ cd cocos2d-html5
$ cocos run -p android -j 4
```

## 构建并本机运行 cocos2d-html5 版本

```
$ cd cocos2d-html5
$ cocos run -p web -m release
```

### Mac 上单独开启 cocos2d-html5 的服务器并运行游戏

```
$ cd cocos2d-html5
$ sh run.sh
```

## 测试方法

点击场景中的加减按钮，调节场景中的对象数量直至帧率达到指定值，然后以当前数量作为性能指标。
