import React from "react"
import "./item.scss"

const Item = ({ data, onClick }) => {
  return (
    <div onClick={onClick} className="item">
      <img src={data.img} className="item__img"></img>
      <div className="item__data">
        <div className="item__data__title">{data.title}</div>
        <div className="item__data__subTitle">{data.subTitle}</div>
      </div>
    </div>
  )
}

export default Item
