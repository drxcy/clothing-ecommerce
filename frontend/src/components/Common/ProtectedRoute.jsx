import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children,role}) {
    const {user} = useSelector((state)=>state.auth)
    if(!user || (role && user.role !==role))
    {
        <Navigate to="/login" replace />
    }
  return children;
}
