import React, {useEffect, createContext} from 'react'
import {auth} from '../appConfig'
import {config} from '../config'
import makeStore from '../common/makeStore'
import axios from 'axios'
import liff from '@line/liff'

const initialState = {
  user: null,
  client: true
}

const reducer = (state, action) => {
  switch (action.type) {
  case 'USER':
    return {
      ...state,
      user: action.payload
    }
  case 'CLIENT':
    return {
      ...state,
      client: action.payload
    }
  default:
    return state
  }
}

const [
  LoginProvider,
  useLoginStore,
  useLoginDispatch,
] = makeStore(reducer, initialState)

export { LoginProvider, useLoginStore, useLoginDispatch}
