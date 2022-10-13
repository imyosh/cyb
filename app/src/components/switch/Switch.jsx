import React from "react"
import "./switch.scss"

const Switch = ({ register }) => {
  return (
    <div onClick={(e) => e.stopPropagation()} className="toggle checkcross">
      <input id="checkcross" type="checkbox" {...register} />
      <label className={"toggle-item"} htmlFor="checkcross">
        <div className="check"></div>
      </label>
    </div>
  )
}

export default Switch
