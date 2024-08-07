### 微前端

> Techniques, strategies and recipes for building a modern web app with multiple teams that can ship features independently. -- [Micro Frontends](https://micro-frontends.org/)
> 
> 微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。

**核心思想：**

- 与技术无关

  每个团队都应该能够选择和升级他们的堆栈，而无需与其他团队协调。自定义元素是隐藏实现细节的好方法，同时为其他人提供中立的界面。

- 隔离团队代码

  即使所有团队都使用相同的框架，也不要共享运行时。构建自包含的独立应用。不要依赖共享状态或全局变量。

- 建立团队前缀

  在尚无法隔离的情况下就命名约定达成一致。Namespace CSS、事件、本地存储和 Cookie，以避免冲突并明确所有权。

- 偏爱原生浏览器功能而非自定义 API

  使用浏览器事件进行通信，而不是构建全局 PubSub 系统。如果确实必须构建跨团队 API，请尝试使其尽可能简单。

- 构建有弹性的网站

  即使 JavaScript 失败或尚未执行，您的功能也应该很有用。使用“通用渲染”和“渐进式增强”来提高感知性能。

**核心价值：**

- 技术栈无关
  
  主框架不限制接入应用的技术栈，微应用具备完全自主权

- 独立开发、独立部署

  微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新

- 增量升级

  在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略

- 独立运行时

  每个微应用之间状态隔离，运行时状态不共享

微前端架构旨在解决单体应用在一个相对长的时间跨度下，由于参与的人员、团队的增多、变迁，从一个普通应用演变成一个巨石应用([Frontend Monolith](https://www.youtube.com/watch?v=pU1gXA0rfwc))后，随之而来的应用不可维护的问题。


## qiankun

qiankun 是一个基于 [single-spa](https://github.com/single-spa/single-spa) 的阿里旗下的微前端实现库。

### 主应用


安装`qiankun`
> $ yarn add qiankun # 或者 npm i qiankun -S

``` js
  import { registerMicroApps, start } from 'qiankun';
  // ...
  useEffect(() => {
    // 挂载子应用
    registerMicroApps([
      {
        // 子应用名称
        name: "reactApp",
        //子应用地址
        entry: "//localhost:3000",
        //挂载节点
        container: "#react-app-box",
        //路由
        activeRule: "/app-react",
      },
      {
        name: "vueApp",
        entry: "//localhost:8080",
        container: "#vue-app-box",
        activeRule: "/app-vue/",
      },
    ])
    // 启动 qiankun
    start()
  }, [])

```

### 子应用

添加`public-path.js`文件
``` js
  if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  }
```

入口文件需添加`生命周期`
``` js
  let root

  function render(props) {
    const { container } = props
    
    root = ReactDOM.createRoot(container ? container.querySelector("#root2") : document.querySelector("#root2"))

    root.render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    )
  }

  if (!window.__POWERED_BY_QIANKUN__) {
    render({})
  }
  /**
   * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
   * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
   */
  export async function bootstrap() {
    console.log("react app bootstraped")
  }

  /**
   * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
   */
  export async function mount(props) {
    render(props)
  }

  /**
   * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
   */
  export async function unmount(props) {
    const { container } = props
    // const root = ReactDOM.createRoot(container ? container.querySelector("#root2") : document.querySelector("#root2"))
    root.unmount()
  }

  /**
   * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
   */
  export async function update(props) {
    console.log("update props", props)
  }
```

配置webpack
``` js
module.exports = function (webpackEnv) {
  // ...
  return {
    // ...
    output:{
      library: `${paths.appPackageJson}-[name]`,
      libraryTarget: "umd",
      // webpack v5
      chunkLoadingGlobal: `webpackJsonp_${paths.appPackageJson}`,
      // webpack v4
      // jsonpFunction: `webpackJsonp_${packageName}`,
      globalObject: "window",
    }
  }
}
```
> `globalObject: "window"` 配置：
> 
> 解决报错：`Application died in status LOADING_SOURCE_CODE: You need to export the functional lifecycles in xxx entry`
>
> 确保其值为 window，或者移除该配置从而使用默认值。

## 文献

- [Micro Frontends](https://micro-frontends.org/)
- [YouTube: Wait, what!? Our microservices have actual human users?](https://www.youtube.com/watch?v=pU1gXA0rfwc)