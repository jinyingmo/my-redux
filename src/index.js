import { combineReducers } from './combineReducers'

const createStore = function(reducer, initState, rewriteCreateStoreFunc) {
  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore)
    return newCreateStore(reducer, initState)
  }
  let state = initState
  let listeners = []
  const subscribe = listener => {
    listeners.push(listener)
  }
  const dispatch = action => {
    state = reducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }
  const getState = () => {
    return state
  }

  //预先dispatch一个无效的type，初始化state
  dispatch({
    type: Symbol()
  })

  return { subscribe, dispatch, getState }
}

export { createStore, combineReducers }
