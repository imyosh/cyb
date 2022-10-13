import React, { useState } from "react"
import "./adminPanel.scss"

import { connect } from "react-redux"
import {
  deleteItem,
  resetItems,
} from "../../redux/components/categories/categoriesSlice"

import Search from "../../components/search/Search"
import ConfirmModal from "../../components/confrimModal/ConfirmModal"
import AddToolModal from "../../components/addToolModal/AddToolModal"

import DeleteIcon from "../../../../resources/svg/trash-alt.svg"
import EditIcon from "../../../../resources/svg/edit.svg"
import AddIcon from "../../../../resources/svg/plus-square.svg"
import ResetIcon from "../../../../resources/svg/history.svg"

const AdminPanel = ({ categories, deleteItem, resetItems }) => {
  // state used to hold the search key
  const [search, setSearch] = useState("")
  // delete modal state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  // reset modal state
  const [isResetConfirmModalOpen, setIsResetConfirmModalOpen] = useState(false)
  //delte modal state
  const [toDeleteTool, setToDeleteTool] = useState(null)
  // add modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  // state to hold the active categroy
  const [activeCategory, setActiveCategory] = useState(null)
  // state to hold the tool to be edited
  const [toEditTool, setToEditTool] = useState(null)

  // filter the tools according to the entered search value
  const filteredCategories =
    search.length === 0
      ? Object.entries(categories)
      : Object.entries(categories).map(([category, items], id) => [
          category,
          items.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          ),
        ])

  // open the modal for adding new tool
  const addTool = (category) => {
    setIsAddModalOpen(true)
    setActiveCategory(category)
  }

  // open the modal for editing the tool
  const editTool = (category, tool) => {
    setToEditTool({ category, tool })
    setActiveCategory(category)
    setIsAddModalOpen(true)
  }

  return (
    <div className="adminPanel">
      <div className="adminPanel__search">
        <div
          className="adminPanel__reset"
          onClick={() => setIsResetConfirmModalOpen(true)}>
          Reset Tools <ResetIcon className="adminPanel__reset__icon" />
        </div>
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="adminPanel__body">
        {filteredCategories.map(([category, items], id) => (
          <div key={id} className="adminPanel__container">
            <div className="adminPanel__title">
              {category}
              <AddIcon
                onClick={() => addTool(category)}
                className="adminPanel__item__icon adminPanel__item__icon__add"
              />
            </div>
            <div className="adminPanel__item__body">
              {items.length === 0
                ? null
                : items.map((item, id) => (
                    <div className="adminPanel__item" key={id}>
                      <div className="adminPanel__item__title">
                        {item.title}
                      </div>
                      <div className="adminPanel__item__icons">
                        <EditIcon
                          onClick={() => editTool(category, item)}
                          className="adminPanel__item__icon adminPanel__item__icon__edit"
                        />
                        <DeleteIcon
                          className="adminPanel__item__icon adminPanel__item__icon__delete"
                          onClick={() => {
                            setIsConfirmModalOpen(true)
                            setToDeleteTool({ category, title: item.title })
                          }}
                        />
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        setIsOpen={setIsConfirmModalOpen}
        title={"Delete Item"}
        message={"Are you sure you want to delete this tool ?"}
        onConfirm={() => {
          deleteItem(toDeleteTool)
          setToDeleteTool(null)
        }}
      />

      <ConfirmModal
        isOpen={isResetConfirmModalOpen}
        setIsOpen={setIsResetConfirmModalOpen}
        title={"Reset Tools"}
        message={"Are you sure you want to reset all tools ?"}
        onConfirm={() => {
          resetItems()
        }}
      />
      <AddToolModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setTimeout(() => {
            setActiveCategory(null)
            setToEditTool(null)
          }, 300)
        }}
        activeCategory={activeCategory}
        toEditTool={toEditTool}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  categories: state.categories,
})

const mapDispatchToProps = { deleteItem, resetItems }

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)
