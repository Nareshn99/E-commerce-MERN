import React from 'react'
import UserMenu from '../../Components/UserMenu';
import Layout from '../../Components/Layout';

function Orders() {

    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-70 p-3'>
                            <h2>All Orders</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders
