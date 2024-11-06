import React, {  useContext } from 'react'
import { AppContext } from '../../appContext/AppContext'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
    const {token,designation} = useContext(AppContext)
    if(!token){
        return <Navigate to='/' />
    }
  return (
    children
  )
}

export default PrivateRoute