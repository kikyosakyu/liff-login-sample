import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useLoginStore } from '../../hooks/loginContext'

const PrivateRoute = (props) => {
  const state = useLoginStore()
  return state.user ? <Route {...props}/> : <Redirect to="/" />
}

export default PrivateRoute
