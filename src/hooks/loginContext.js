import makeStore from '../common/makeStore'

const initialState = {
  user: null,
  client: false
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
