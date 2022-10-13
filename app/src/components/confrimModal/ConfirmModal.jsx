import React, { useState, useEffect } from "react"
import "./confirmModal.scss"

import { Modal } from "react-responsive-modal"
import CloseIcon from "../../../../resources/svg/close.svg"

const ConfirmModal = ({ isOpen, setIsOpen, title, message, onConfirm }) => {
  const [isOpen2, setIsOpen2] = useState(isOpen)

  const onModalConfrim = () => {
    // fire the confrim function and close the modal
    onConfirm()
    setIsOpen(false)
  }

  // wait for 200ms before unmountin the modal , a fix requried for the modal
  useEffect(() => {
    if (isOpen) setIsOpen2(isOpen)
    else
      setTimeout(() => {
        setIsOpen2(isOpen)
      }, 200)
  }, [isOpen])

  return (
    isOpen2 && (
      <Modal open={isOpen} onClose={() => setIsOpen(false)} center>
        <CloseIcon
          onClick={() => setIsOpen(false)}
          className="confirmModal__close"
        />
        <div className="modal__window confirmModal">
          <div className="confirmModal__title">{title}</div>
          <div className="confirmModal__message">{message}</div>
          <div className="confirmModal__btns">
            <div onClick={onModalConfrim} className="confirmModal__btn">
              Confirm
            </div>
          </div>
        </div>
      </Modal>
    )
  )
}

export default ConfirmModal
