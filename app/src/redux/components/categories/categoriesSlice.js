import { createSlice } from "@reduxjs/toolkit"

// default values of the categories
let defaultData = require("./data.json")

// getting the saved categories data or the default one
const getData = () => {
  let initials = api.store.initial()

  console.log(initials)
  if (initials.categories) return initials.categories
  return defaultData
}

// slice redux state to hold categories data
const categoriesSlice = createSlice({
  name: "categories",
  initialState: getData(),
  reducers: {
    // function to add new tool to a specific category
    addItem(state, action) {
      state[action.payload.category].push(action.payload.item)
    },

    // function to remove a tool from a specific category
    deleteItem(state, action) {
      state[action.payload.category] = state[action.payload.category].filter(
        (item) => item.title !== action.payload.title
      )
    },

    // function to update a tool within a specific category
    updateItem(state, action) {
      let tool = state[action.payload.category].find(
        (tool) => tool.id === action.payload.tool.id
      )
      if (tool) Object.assign(tool, action.payload.tool)
    },

    // function to reset the categories data to default
    resetItems(state, action) {
      return defaultData
    },
  },
})

// Export actions
export const { addItem, deleteItem, updateItem, resetItems } =
  categoriesSlice.actions

// Export reducer
export default categoriesSlice.reducer
