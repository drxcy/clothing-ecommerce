import React from 'react'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'
import Header from '../Common/Header'

export default function UserLayout() {
  return (
    <>
{/* Header */}
<Header/>
{/* Main */}
<main>
  <Outlet/>
</main>
{/* Footer */}
<Footer />

    </>
  )
}
