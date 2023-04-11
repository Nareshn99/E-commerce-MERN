import React from 'react'
import Layout from '../../Components/Layout'
import UserMenu from '../../Components/UserMenu'
import { useAuth } from '../../context/auth';

function Dashborad() {
  const [auth,setAuth]=useAuth();
  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu/>
            </div>
            <div className='col-md-9'>
                <div className='card w-70 p-3'>
                    <h2>User Name: {auth?.user?.name}</h2>
                    <h4>User Email Id: {auth?.user?.email}</h4>
                    <h4>User Phone No.: {auth?.user?.phone}</h4>
                    <h4>User City: {auth?.user?.addressCity}</h4>
                </div>
            </div>
        </div>
    </div>
</Layout>
  )
}

export default Dashborad
