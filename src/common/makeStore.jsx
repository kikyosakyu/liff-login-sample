import React, {createContext, useContext, useReducer} from 'react'

const makeStore = (reducer, initialState) => {
  const storeContext = createContext()
  const dispatchContext = createContext()

  const StoreProvider = ({children}) => {
    const [store, dispatch] = useReducer(reducer, initialState)

    return (
      <dispatchContext.Provider value={dispatch}>
        <storeContext.Provider value={store}>
          { children }
        </storeContext.Provider>
      </dispatchContext.Provider>
    )
  }

  function useStore() {
    return useContext(storeContext)
  }

  function useDispatch() {
    return useContext(dispatchContext)
  }

  return [StoreProvider, useStore, useDispatch]
}

export default makeStore
