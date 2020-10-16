import React from 'react'
import { useLoginStore } from '../../hooks/loginContext'

const Home = () => {
  const state = useLoginStore()
  return (
    <div>
      hello {state.user.displayName}
      <img src={state.user.photoURL}/>
    </div>
  )
}

export default Home
