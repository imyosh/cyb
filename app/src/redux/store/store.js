import { combineReducers } from "redux"
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { createHashHistory } from "history"
import { createReduxHistoryContext } from "redux-first-history"

import categoriesReducer from "../components/categories/categoriesSlice"
import activeCategoryReducer from "../components/activeCategory/activeCategorySlice"

const { routerMiddleware, createReduxHistory, routerReducer } =
  createReduxHistoryContext({
    history: createHashHistory(),
  })

// create the redux store using the reducers
export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    categories: categoriesReducer,
    activeCategoryName: activeCategoryReducer,
  }),
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    routerMiddleware,
  ],
})

export const history = createReduxHistory(store)
