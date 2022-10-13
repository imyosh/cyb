import React, { useState, useEffect, useMemo } from "react"
import "./categoryPanel.scss"

import { connect } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import Search from "../../components/search/Search"
import Item from "../../components/item/Item"

import ItemView from "../itemView/ItemView"

const CategoryPanel = ({ categories, activeCategoryName }) => {
  // state to hold the search key
  const [search, setSearch] = useState("")
  // state to hold the current active item
  const [activeItem, setActiveItem] = useState(null)

  // current location of the pages
  const location = useLocation()

  // get the active category items
  let activeCategory = useMemo(
    () =>
      activeCategoryName === "Home"
        ? Object.values(categories)
            .map((items) => items.filter((item) => item.isHome))
            .flat()
        : categories[activeCategoryName],
    [categories, activeCategoryName]
  )

  // filter the categories tools based on the search key
  const filteredItems =
    search.length === 0
      ? activeCategory
      : activeCategory.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        )

  // open tool to the tool view
  const openItem = (item) => {
    setActiveItem(item)
  }

  // reset the search filed and the tool when the location changes
  useEffect(() => {
    setSearch("")
    setActiveItem(null)
  }, [location])

  // in case of an active tool open it in the tool view
  if (activeItem)
    return <ItemView item={activeItem} setActiveItem={setActiveItem} />

  // otherwise open the category panel
  return (
    <div className="categoryPanel">
      <div className="categoryPanel__search">
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="categoryPanel__body">
        {filteredItems.length == 0 ? (
          <div className="categoryPanel__body--empty">No Items</div>
        ) : (
          filteredItems.map((item, i) => (
            <Item key={i} onClick={() => openItem(item)} data={item} />
          ))
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  activeCategoryName: state.activeCategoryName,
})

export default connect(mapStateToProps)(CategoryPanel)
