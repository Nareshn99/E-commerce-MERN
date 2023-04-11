import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner'
import { useAuth } from '../../context/auth'
import axios from 'axios';
import { Outlet } from 'react-router-dom';

function Admin() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const checkAuth = async () => {
            let res = await axios.get("/admin-auth")
            if (res.data.Ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }
        if (auth?.token) checkAuth()
    }, [auth?.token])
    return ok ? <Outlet /> : <Spinner path=""/>

}

export default Admin
