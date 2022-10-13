import isEqual from "is-equal"
import watch from "redux-watch"
import debounce from "lodash.debounce"
import { writeConfigRequest } from "secure-electron-store"

const setupWhatcers = (store) => {
  // what the chagnes for the categories slice
  // use is-equal to compare the states
  // save to disk whenever change happens
  // debounce effect for 1 second to prevent scamming actions
  let tasksWatcher = watch(store.getState, "categories", isEqual)
  store.subscribe(
    debounce(
      tasksWatcher((newVal, oldVal, objectPath) => {
        api.store.send(writeConfigRequest, "categories", newVal)
      }),
      1000
    )
  )
}

export default setupWhatcers
