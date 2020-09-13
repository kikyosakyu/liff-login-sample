import React, {useState} from 'react'
import liff from '@line/liff'
import {config} from '../../config'

export const LiffContext = React.createContext()

const LiffProvider = ({children}) => {
  const liffId = config.line.login.liffId
  liff.init({liffId})
    .catch(error => console.log(error))

  return (
    <LiffContext.Provider value={liff}>
      {children}
    </LiffContext.Provider>
  )  
}

export default LiffProvider
