import React, { useState, useRef, useEffect } from "react"
import "./addToolModal.scss"

import { useForm } from "react-hook-form"
import { connect } from "react-redux"

import Switch from "../switch/Switch"

import { Modal } from "react-responsive-modal"

import {
  addItem,
  updateItem,
} from "../../redux/components/categories/categoriesSlice"
import { getBase64 } from "../../functions"

import CloseIcon from "../../../../resources/svg/close.svg"
import AddIcon from "../../../../resources/svg/plus-square.svg"
import AddIcon2 from "../../../../resources/svg/plus.svg"
import SaveIcon from "../../../../resources/svg/save.svg"

const AddToolModal = ({
  isOpen,
  onClose,
  activeCategory,
  addItem,
  updateItem,
  toEditTool,
}) => {
  // state used to hold the image base64 format
  const [selectedImg, setSelectedImg] = useState(null)
  // state used to hold the doc file name
  const [selectedDoc, setSelectedDoc] = useState(null)

  // extract the base64 from the sected image
  const onChangeImg = (event) => {
    const file = event.target.files[0]
    getBase64(file, (base64) => {
      setSelectedImg(base64)
    })
  }

  // set the document file name in the modal
  const onChangeDoc = (event) => {
    const file = event.target.files[0]
    setSelectedDoc(file.name)
  }

  // initialization of the form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (toEditTool) {
      // when in edit status, pupulate the form with the the tool's data
      reset(toEditTool.tool)
      setSelectedImg(toEditTool.tool.img)
      setSelectedDoc(toEditTool.tool.documentTitle)
    } else {
      // reset the form to add new tool
      reset({})
      setSelectedImg(null)
      setSelectedDoc(null)
    }
  }, [toEditTool])

  const onSubmit = handleSubmit((data) => {
    // update the tool with the new data
    if (toEditTool) {
      // check if the doc changed
      if (toEditTool.tool.documentTitle === selectedDoc)
        updateItem({
          category: activeCategory,
          tool: { ...data, img: selectedImg ? selectedImg : data.img },
        })
      else {
        let docFile = data.html[0]
        api.convertToHtml(docFile.path, (html) => {
          updateItem({
            category: activeCategory,
            tool: {
              ...data,
              img: selectedImg ? selectedImg : data.img,
              documentTitle: docFile.name,
              html: html.value,
            },
          })
        })
      }
    } else {
      let docFile = data.html[0]
      // convert the doc file into html
      api.convertToHtml(docFile.path, (html) => {
        // add the tool to the respective active category
        addItem({
          category: activeCategory,
          item: {
            ...data,
            id: crypto.randomUUID(),
            documentTitle: docFile.name,
            img: selectedImg,
            html: html.value,
          },
        })
      })
    }

    // close and reset the form
    setTimeout(() => {
      reset()
      setSelectedImg(null)
      setSelectedDoc(null)
    }, 300)
    onClose()
  })

  // wait for 200ms before unmountin the modal , a fix requried for the modal
  const [isOpen2, setIsOpen2] = useState(isOpen)
  useEffect(() => {
    if (isOpen) setIsOpen2(isOpen)
    else
      setTimeout(() => {
        setIsOpen2(isOpen)
      }, 200)
  }, [isOpen])

  return (
    isOpen2 && (
      <Modal
        open={isOpen}
        onClose={() => {
          // close and reset the form
          setTimeout(() => {
            reset()
            setSelectedImg(null)
            setSelectedDoc(null)
          }, 300)
          onClose()
        }}
        center>
        <form onSubmit={onSubmit} className="addToolModal">
          <CloseIcon onClick={onClose} className="addToolModal__close" />

          <div className="addToolModal__title__group">
            <h1 className="addToolModal__title">
              {toEditTool ? `Edit ${toEditTool.tool.title}` : "Add New Item"}
            </h1>
          </div>

          <div className="addToolModal__fields">
            <div className="group">
              <input
                {...register("title", {
                  required: true,
                  minLength: 3,
                  maxLength: 35,
                })}
                id="title"
                type="text"
                placeholder="h"
              />
              <label htmlFor="title">Title</label>
              <div className="bar"></div>
            </div>

            <div>
              <div className="group">
                <input
                  {...register("subTitle", {
                    required: true,
                    minLength: 3,
                    maxLength: 35,
                  })}
                  id="subTitle"
                  type="text"
                  placeholder="h"
                />
                <label htmlFor="subTitle">Sub Title</label>
                <div className="bar"></div>
              </div>
            </div>

            <div
              onClick={() => document.getElementById("image-input").click()}
              className="addToolModal__image"
              style={{
                background: errors.img ? "rgb(255 159 159)" : "#161822",
              }}>
              <input
                {...register("img", {
                  required: toEditTool ? false : true,
                  onChange: onChangeImg,
                })}
                style={{ display: "none" }}
                type="file"
                accept=".jpg, .png, .jpeg"
                id="image-input"
              />
              {selectedImg ? <img src={selectedImg}></img> : "Add Image"}
            </div>

            <div className="addToolModal__switch">
              <div
                style={{
                  color: errors.isHome ? "rgb(255 106 106)" : "#fff",
                }}>
                Present in Home
              </div>

              <Switch register={register("isHome")} />
            </div>

            <div className="addToolModal__doc">
              <div
                style={{
                  color: errors.html ? "rgb(255 106 106)" : "#fff",
                }}
                className="addToolModal__doc__title">
                Document
                <AddIcon
                  onClick={() => document.getElementById("doc-input").click()}
                  className="addToolModal__doc__icon"
                />
              </div>

              {selectedDoc ? (
                <div className="addToolModal__doc__file">{selectedDoc}</div>
              ) : null}

              <input
                {...register("html", {
                  required: toEditTool ? false : true,
                  onChange: onChangeDoc,
                })}
                style={{ display: "none" }}
                type="file"
                accept=".docx"
                id="doc-input"
              />
            </div>
          </div>

          <button className="addToolModal__btn">
            {toEditTool ? <SaveIcon /> : <AddIcon2 />}
          </button>
        </form>
      </Modal>
    )
  )
}

const mapDispatchToProps = { addItem, updateItem }

export default connect(null, mapDispatchToProps)(AddToolModal)
