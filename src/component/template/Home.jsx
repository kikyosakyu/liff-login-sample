import React, {useContext} from 'react'
import { useLoginStore } from '../../hooks/loginContext'
import {AuthContext} from '../auth/AuthProvider'

const Home = () => {
  const state = useLoginStore()

  const liffLogout = useContext(AuthContext)[1]
  const liffClose = useContext(AuthContext)[2]
  
  return (
    <>
      {state.user ?
       (<div>hello {state.user.displayName}
          <img src={state.user.photoURL} alt="icon"/>
          <button
            type="button"
            onClick={()=>state.client ? liffClose() : liffLogout()}>
            {state.client ? "CLOSE" : "SIGN OUT"}
          </button>
        </div>
       ) :
       (null)}
    </>
  )
}

export default Home
