import makeStore from '../common/makeStore'

const initialState = {
  user: null,
  client: false,
  isLoading: true
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
  case 'LOADING':
    return {
      ...state,
      isLoading: true
    }
  case 'LOADED':
    return {
      ...state,
      isLoading: false
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
