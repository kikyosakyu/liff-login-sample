import React, {useEffect, useContext} from 'react'
import {auth} from '../../appConfig'
import {config} from '../../config'
import axios from 'axios'
import liff from '@line/liff'
import {useLoginStore, useLoginDispatch} from '../../hooks/loginContext'
import {AuthContext} from '../auth/AuthProvider'

const SignIn = ({history}) => {
  const state = useLoginStore()
  const dispatch = useLoginDispatch()

  const liffLogin = useContext(AuthContext)
    
  return (
    <>
      {(!state.client && !state.user)
       ? <button type="button" onClick={()=>liffLogin()}>Login</button>
       : null}
      {state.user
       ? <div>
           hello {state.user.displayName}
           <img src={state.user.photoURL}/>
         </div>
       : null}
    </>
  )
}

export default SignIn
