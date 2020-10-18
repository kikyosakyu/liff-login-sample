import React, {useContext} from 'react'
import {useLoginStore} from '../../hooks/loginContext'
import {AuthContext} from '../auth/AuthProvider'

const SignIn = ({history}) => {
  const state = useLoginStore()

  const liffLogin = useContext(AuthContext)[0]
    
  return (
    <>
      {(!state.client && !state.user)
       ? <button type="button" onClick={()=>liffLogin()}>
           SIGN IN
         </button>
       : null}
    </>
  )
}

export default SignIn
