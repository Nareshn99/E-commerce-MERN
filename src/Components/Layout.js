import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Toaster } from 'react-hot-toast';

function Layout(props) {
  return (
    <div>
      <Header />
      <main style={{minHeight:'70vh'}}>
      <Toaster />
      {props.children}</main>
      <Footer />
    </div>
  )
}

export default Layout