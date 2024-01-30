import React from 'react'
import { NavLink } from 'react-router-dom'

function NavIcon() {
  return (
    <div className="let-nav-container">
        <div className="icons bg-red">
            <div className="icons-bis">
                <NavLink to="/" className={({isActive})=>
                 `active-left-nav ${isActive ? "bg-#fdeeee":""}`}>
                    <img src="./img/icons/home.svg" alt="" />
                </NavLink>
                <br />
                <NavLink to="/trending" className={({isActive})=>
                 `active-left-nav ${isActive ? "bg-#fdeeee":""}`}>
                    <img src="./img/icons/rocket.svg" alt="" />
                </NavLink>
                <br />
                <NavLink to="/profil" className={({isActive})=>
                 `${isActive ? "bg-red":""}`}>
                    <img src="./img/icons/user.svg" alt="" />
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default NavIcon
