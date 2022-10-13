import React from "react"
import "./nav.scss"

import { useNavigate } from "react-router-dom"
import { connect } from "react-redux"

import { NavLink } from "react-router-dom"

import { setactiveCategoryName } from "../redux/components/activeCategory/activeCategorySlice"

import logo from "Images/logo.png"

import Home from "../../../resources/svg/estate.svg"
import Padlock from "../../../resources/svg/padlock.svg"
import Bluetooth from "../../../resources/svg/bluetooth.svg"
import Swords from "../../../resources/svg/swords.svg"
import Wifi from "../../../resources/svg/wifi.svg"
import Panel from "../../../resources/svg/iconmonstr-control-panel-2.svg"

// map the svg icons with the imported icons
let svgs = {
  "Home": <Home className="nav_item_icon" />,
  "Wi-Fi": <Wifi className="nav_item_icon" />,
  "Password Cracking": <Padlock className="nav_item_icon" />,
  "Penetration Testing": (
    <Swords className="nav_item_icon nav_item_icon-swords" />
  ),
  "Bluetooth": <Bluetooth className="nav_item_icon" />,
}

const Nav = ({ categories, setactiveCategoryName }) => {
  return (
    <nav className="nav">
      <div className="nav_logo">
        <img src={logo} className="nav_logo_icon"></img>
        CYB-TR
      </div>
      <div className="nav_title">Categories</div>
      <div className="nav_body">
        <NavLink
          to={"/home"}
          className={({ isActive }) =>
            isActive ? "nav_item nav_item--active" : "nav_item"
          }
          onClick={() => setactiveCategoryName("Home")}>
          {svgs["Home"]}
          Home
        </NavLink>

        {/* generate nav based on the categories */}
        {Object.keys(categories).map((item, i) => (
          <NavLink
            to={`/${item.replaceAll(" ", "-")}`}
            className={({ isActive }) =>
              isActive ? "nav_item nav_item--active" : "nav_item"
            }
            onClick={() => setactiveCategoryName(item)}
            key={i}>
            {svgs[item]}

            {item}
          </NavLink>
        ))}
      </div>
      <div className="nav__footer">
        <NavLink
          to="admin-panel"
          className={({ isActive }) =>
            isActive ? "nav_item nav_item--active" : "nav_item"
          }>
          <Panel className="nav_item_icon" />
          Admin Panel
        </NavLink>
      </div>
    </nav>
  )
}

// expose the navigate function to the nav component
function WithNavigate(props) {
  const navigate = useNavigate()
  return <Nav {...props} navigate={navigate} />
}

const mapStateToProps = (state) => ({
  categories: state.categories,
})

const mapDispatchToProps = { setactiveCategoryName }

export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate)
