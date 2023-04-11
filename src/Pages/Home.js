import React from 'react'
import Layout from '../Components/Layout'
import { useAuth } from '../context/auth'

function Home() {
 const [auth,setAuth]=useAuth()
    return (
        <Layout>
            <h1>home</h1>
            <pre>{JSON.stringify(auth,null,4)}</pre>
        </Layout>
    )
}

export default Home
