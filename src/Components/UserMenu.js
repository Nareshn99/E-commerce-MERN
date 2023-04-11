import React from 'react'
import { NavLink } from 'react-router-dom' 

function UserMenu() {
    return (
        <>
            <div classname='text-centre'>
                <div class="list-group text-align-centre">
                    <h4>User Menu</h4>
                    <NavLink to="/dashborad/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
                    <NavLink to="/dashborad/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
                </div>
            </div>
        </>
    )
}

export default UserMenu
