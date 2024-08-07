import * as React from "react"
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom"
import Layout from "../Layout/index"
import Page1 from "../pages/index"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
    },
    {
      path: "/page1",
      element: <Page1 />,
    },
  ],
  {
    basename: window.__POWERED_BY_QIANKUN__ ? "/app-react" : "/",
  }
)

export default router
