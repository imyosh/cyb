import { createSlice } from "@reduxjs/toolkit"

// slice redux state to hold the current active category name
const activeCategroySlice = createSlice({
  name: "activeCategoryName",
  initialState: "Home",
  reducers: {
    // function to set the active category name
    setactiveCategoryName(state, action) {
      return action.payload
    },
  },
})

// Export actions
export const { setactiveCategoryName } = activeCategroySlice.actions

// Export reducer
export default activeCategroySlice.reducer
