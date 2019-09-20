import { combineReducers } from './combineReducers'

const createStore = function(reducer, initState) {
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
  return { subscribe, dispatch, getState }
}

function countReducer(state, action) {
  switch (action.type) {
    case 'PLUS':
      return {
        ...state,
        num: state.num + 1
      }
    case 'MINUS':
      return {
        ...state,
        num: state.num - 1
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  count: countReducer
})

let initState = {
  count: {
    num: 0
  }
}

let store = createStore(reducer, initState)
store.subscribe(() => {
  let state = store.getState()
  console.log(state)
})

store.dispatch({
  type: 'PLUS'
})

store.dispatch({
  type: 'MINUS'
})
