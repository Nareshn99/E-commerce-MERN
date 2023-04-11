import React from 'react'
import Layout from '../../Components/Layout'
import AdminMenu from '../../Components/AdminMenu'
function Users() {
    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-70 p-3'>
                            <h2>All Users</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users
