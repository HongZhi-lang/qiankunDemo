import "./public-path"
import Vue from "vue"
import App from "./App.vue"
import routes from "./router"

Vue.config.productionTip = false

let instance = null

function render(props = {}) {
  const { container } = props
  console.log("vue", container)
  
  instance = new Vue({
    el: container ? container.querySelector("#app") : "#app",
    router: routes,
    render: (h) => h(App),
  })
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  console.log(1);
  render()
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped")
}
export async function mount(props) {
  console.log("[vue] props from main framework", props)
  render(props)
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ""
  instance = null
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log("[vue] update props", props)
}
