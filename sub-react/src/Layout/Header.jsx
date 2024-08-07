import React from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()

  return (
    <div>
      <NavLink to="page1">Page1</NavLink>
    </div>
  )
}

export default Header
