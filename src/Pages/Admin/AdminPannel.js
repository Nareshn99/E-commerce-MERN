import React from 'react'
import Layout from '../../Components/Layout'
import { useAuth } from '../../context/auth'
import AdminMenu from '../../Components/AdminMenu';

function AdminPannel() {
    const [auth,setAuth]=useAuth();
    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu/>
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-70 p-3'>
                            <h2>Admin Name: {auth?.user?.name}</h2>
                            <h4>Admin Email Id: {auth?.user?.email}</h4>
                            <h4>Admin Phone No.: {auth?.user?.phone}</h4>
                            <h4>Admin City: {auth?.user?.addressCity}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminPannel
