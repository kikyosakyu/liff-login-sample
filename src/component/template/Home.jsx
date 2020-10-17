import React, {useContext} from 'react'
import { useLoginStore } from '../../hooks/loginContext'
import {AuthContext} from '../auth/AuthProvider'

const Home = () => {
  const state = useLoginStore()

  const liffLogout = useContext(AuthContext)[1]
  
  return (
    <>
      {state.user ?
       (<div>hello {state.user.displayName}
          <img src={state.user.photoURL} alt="icon"/>
          <button type="button" onClick={()=>liffLogout()}>Log out</button>
        </div>
       ) :
       (null)}
    </>
  )
}

export default Home
