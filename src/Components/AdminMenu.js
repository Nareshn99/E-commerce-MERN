import React from 'react'
import { NavLink } from 'react-router-dom' 

function AdminMenu() {
    return (
        <>
            <div classname='text-centre'>
                <div class="list-group text-align-centre">
                    <h4>AdminPannel</h4>
                    <NavLink to="/dashborad/admin/add-product" className="list-group-item list-group-item-action">Add Product</NavLink>
                    <NavLink to="/dashborad/admin/add-catagory" className="list-group-item list-group-item-action">Add Catagory</NavLink>
                    <NavLink to="/dashborad/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
                </div>
            </div>
        </>
    )
}

export default AdminMenu
