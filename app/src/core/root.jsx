import React, { useEffect } from "react"
import { HistoryRouter } from "redux-first-history/rr6"
import { Provider } from "react-redux"
import AppRoutes from "Core/routes"
import Nav from "./nav"
import "./root.css"

import setupWhatcers from "../functions/setupWhatcers"

const Root = ({ store, history }) => {
  useEffect(() => {
    // whatch for the changes of data and save to disk whenever a change happens
    setupWhatcers(store)
  }, [])

  return (
    <React.Fragment>
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Nav history={history}></Nav>
          <AppRoutes></AppRoutes>
        </HistoryRouter>
      </Provider>
    </React.Fragment>
  )
}

export default Root
