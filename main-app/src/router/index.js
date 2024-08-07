import * as React from "react"
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom"
import ReactAppBox from "../component/ReactAppBox"
import VueAppBox from "../component/VueAppBox"

const router = createBrowserRouter([
  {
    path: "/app-react/*",
    element: ReactAppBox,
  },
  {
    path: "/app-vue/*",
    element: VueAppBox,
  },
])

export default router
