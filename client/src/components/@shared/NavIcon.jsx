import React from 'react'
import { NavLink } from 'react-router-dom'

function NavIcon() {
  return (
    <div className="let-nav-container">
        <div className="icons">
            <div className="icons-bis">
                <NavLink to="/" ClassName="active-left-nav">
                    <img src="./img/icons/home.svg" alt="" />
                </NavLink>
                <br />
                <NavLink to="/trending" >
                    <img src="./img/icons/rocket.svg" alt="" />
                </NavLink>
                <br />
                <NavLink to="/profil" >
                    <img src="./img/icons/user.svg" alt="" />
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default NavIcon
