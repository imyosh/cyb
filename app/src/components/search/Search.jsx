import React from "react"
import "./search.scss"
import Icon from "./search.svg"

const Search = ({ search, setSearch }) => {
  return (
    <div className="search">
      <input
        className="search__input"
        placeholder="Search.."
        spellCheck={false}
        value={search}
        onChange={(e) => setSearch(e.target.value)}></input>
      <Icon className="search__icon" />
    </div>
  )
}

export default Search
