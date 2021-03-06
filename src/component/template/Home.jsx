import React, {useContext} from 'react'
import { useLoginStore } from '../../hooks/loginContext'
import {AuthContext} from '../auth/AuthProvider'
import {useHistory} from 'react-router-dom'
import {Loading} from './index'

const Home = () => {
  const state = useLoginStore()
  const history = useHistory()
  const liffLogout = useContext(AuthContext)[1]
  const liffClose = useContext(AuthContext)[2]
  
  return (
    <>
      {state.isLoading ? (
        <Loading />
      ) : (
        state.user ? (
          <div>hello {state.user.displayName}
            <img src={state.user.photoURL} alt="icon"/>
            <button
              type="button"
              onClick={()=>state.client==="LIFF" ? liffClose() : liffLogout()}>
              {state.client === "LIFF" ? "CLOSE" : "SIGN OUT"}
            </button>
            <button
              type="button"
              onClick={()=>history.push("/profile")}>
              PROFILE
            </button>
          </div>
        ) : (
          null
        )
      )}
    </>
  )
}

export default Home
