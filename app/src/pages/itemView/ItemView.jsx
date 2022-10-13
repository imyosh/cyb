import React, { useEffect, useRef } from "react"
import "./itemView.scss"

import BackIcon from "../../../../resources/svg/left-arrow-from-left.svg"

const ItemView = ({ item, setActiveItem }) => {
  let bodyRef = useRef()

  // apply styles to the first image in the document
  useEffect(() => {
    bodyRef.current
      .getElementsByTagName("img")[0]
      .classList.add("itemView__img")
  }, [item])

  return (
    <div className="itemView">
      <div className="itemView__title">
        {item.title} -
        <span className="itemView__subTitle">{item.subTitle}</span>
        <BackIcon
          className="itemView__back"
          onClick={() => setActiveItem(null)}
        />
      </div>

      <div
        ref={bodyRef}
        className="itemView__body"
        dangerouslySetInnerHTML={{
          __html: item.html,
        }}></div>
    </div>
  )
}

export default ItemView
