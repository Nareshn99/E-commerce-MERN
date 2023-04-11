import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Layout from '../../Components/Layout'
import { useAuth } from '../../context/auth';



function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/v1/auth/login", { email, password })
           
            if (res && res.data.status) {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.data.user,
                    token: res.data.data.token,
                })
                console.log(res.data.data)
                localStorage.setItem("auth",JSON.stringify(res.data.data))
                navigate("/")
            } else {
                toast.error(res.data.message)
            }
        }
        catch (e) {
            toast.error("Something went wrong")
        }
    }


    return (
        <Layout>
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN FORM</h4>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        LOGIN
                    </button>
                    <button type="submit" className="btn btn-primary" onClick={()=>navigate("/forgot-password")}>
                        FORGOT PASSWORD
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Login
