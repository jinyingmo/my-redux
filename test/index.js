import { combineReducers, createStore } from '../src/index'

let initState = {
  num: 0
}

function countReducer(state = initState, action) {
  switch (action.type) {
    case 'PLUS':
      return {
        //...state,
        num: state.num + 1
      }
    case 'MINUS':
      return {
        //...state,
        num: state.num - 1
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  count: countReducer
})

let store = createStore(reducer)
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
