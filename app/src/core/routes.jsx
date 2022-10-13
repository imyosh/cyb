import React from "react"
import { Routes, Route } from "react-router"
import loadable from "@loadable/component"

// import {redi} from 'react-router-dom'

// Load bundles asynchronously so that the initial render happens faster
const CategoryPanel = loadable(() =>
  import(
    /* webpackChunkName: "ContextMenuChunk" */ "Pages/categoryPanel/CategoryPanel"
  )
)

const AdminPanel = loadable(() =>
  import(
    /* webpackChunkName: "ContextMenuChunk" */ "Pages/adminPanel/AdminPanel"
  )
)

class AppRoutes extends React.Component {
  render() {
    return (
      <div
        style={{
          flex: 1,
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(5px)",
        }}>
        <Routes>
          <Route path={"/admin-panel"} element={<AdminPanel />}></Route>
          <Route path={"/*"} element={<CategoryPanel />}></Route>
        </Routes>
      </div>
    )
  }
}

export default AppRoutes
