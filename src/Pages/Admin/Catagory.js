import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import AdminMenu from '../../Components/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import CatagoryForm from '../Forms/CatagoryForm';

function Catagory() {

    const [catagory, setCatagory] = useState();
    const [name,setName]=useState();
    const getAllCatagory = async () => {
        try {
            const res = await axios.get("/api/v1/catagory/get-all-catagory")
            if (res && res.data.status) {
                toast.success(res.data.message)
                console.log(res.data)
                setCatagory(res.data.data)
            } else {
                toast.error(res.data.message)
            }
        }
        catch (e) {
            toast.error("Something went wrong")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/v1/catagory/add-catagory", { name })
            if (res?.data.status) {
                toast.success(res.data.message)
                getAllCatagory()
            } else {
                toast.error(res.data.message)
            }
        }
        catch (e) {
            toast.error("Something went wrong")
        }
    }

    const handleSubmitDelete = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.delete("/api/v1/catagory/delete-catagory")
            if (res?.data.status) {
                toast.success(res.data.message)
                getAllCatagory()
            } else {
                toast.error(res.data.message)
            }
        }
        catch (e) {
            toast.error("Something went wrong")
        }
    }



    useEffect(() => {
        getAllCatagory()
    }, [])

    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-70 p-3'>
                            <h2>Manage Catagory</h2>

                            <CatagoryForm value={name} setValue={setName} handleSubmit={handleSubmit}/>
                            <div className='w-75 p-3'>
                                <table className='table table-dark table-striped'>
                                    <thead>
                                        <tr>
                                            <th scope="col">Sr.No</th>
                                            <th scope="col">Catagory</th>
                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            catagory?.map((c, idx) =>
                                                <>
                                                    <tr >
                                                        <th scope="row">{idx + 1}</th>
                                                        <td key={c._id}>{c.name}</td>
                                                        <td>
                                                            <button className='btn btn-primary m-2'>Edit</button>
                                                            <button className='btn btn-danger m-2' onClick={()=>handleSubmitDelete}>Delete</button>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Catagory
