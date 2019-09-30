import { combineReducers } from './combineReducers'

const createStore = function(reducer, initState, rewriteCreateStoreFunc) {
  //可以省略不传initState，则第二个参数为rewriteCreateStoreFunc
  if (initState && typeof initState === 'function') {
    rewriteCreateStoreFunc = initState
    initState = {}
  }
  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore)
    return newCreateStore(reducer, initState)
  }
  let state = initState
  let listeners = []
  const subscribe = listener => {
    listeners.push(listener)
    //增加退订
    return () => {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
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
  const replaceReducer = nextReducer => {
    reducer = nextReducer
    //刷新一遍 state 的值
    dispatch({ type: Symbol() })
  }

  //预先dispatch一个无效的type，初始化state
  dispatch({
    type: Symbol()
  })

  return { subscribe, dispatch, getState, replaceReducer }
}

export { createStore, combineReducers }
