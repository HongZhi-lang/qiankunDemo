import "./App.css"
import { useEffect } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { registerMicroApps, start } from "qiankun"
import ReactAppBox from "./component/ReactAppBox"
import VueAppBox from "./component/VueAppBox"
import logo from "./logo.svg"

function App() {
  useEffect(() => {
    registerMicroApps([
      {
        name: "reactApp",
        entry: "//localhost:3000",
        container: "#react-app-box",
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

  const openCcLive = () => {
    function checkSoftwareInstalled() {
      const iframe = document.createElement("iframe")
      iframe.style.display = "none"
      iframe.src = `cclive://016F21FC4A1E19A6/559BAE016638DCF19C33DC5901307461/${encodeURI("测试")}/123456`

      document.body.appendChild(iframe)

      // 成功加载的处理函数
      iframe.onload = function () {
        console.log(1)
        alert("软件已安装并成功唤起")
        document.body.removeChild(iframe)
      }

      // 加载失败的处理函数
      iframe.onerror = function () {
        console.log(1)

        alert("软件未安装或无法唤起")
        document.body.removeChild(iframe)
      }

      document.body.appendChild(iframe)

      // 超时处理
      setTimeout(() => {
        console.log(document.body.contains(iframe))

        if (document.body.contains(iframe)) {
          alert("软件未安装或无法唤起")
          console.log(2)

          document.body.removeChild(iframe)
        }
      }, 3000) // 3秒超时
    }

    checkSoftwareInstalled()

    // cclive://userid/roomid/name/password
    // window.location.href = `cclive://016F21FC4A1E19A6/559BAE016638DCF19C33DC5901307461/${encodeURI("测试")}/123456`
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>MainApp</h3>
      </header>
      <main className="App-main">
        <NavLink className="App-link" to="/">
          Home
        </NavLink>
        <NavLink className="App-link" to="/app-react">
          React
        </NavLink>
        <NavLink className="App-link" to="/app-vue/">
          Vue
        </NavLink>
        {/* <NavLink className="App-link" to="/cc" onClick={openCcLive}>
          Open ccLive
        </NavLink> */}
      </main>
      <ReactAppBox />
      <VueAppBox />
    </div>
  )
}

export default App
