import { combineReducers, createStore } from '../src/index'
import { applyMiddleware } from '../src/applyMiddleware'

import { prevLogger } from '../middlewares/prevLogger'
import { nextLogger } from '../middlewares/nextLogger'

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

const middlewares = applyMiddleware(prevLogger, nextLogger)

let store = createStore(reducer, {}, middlewares)
const unsubscribe = store.subscribe(() => {
  let state = store.getState()
  console.log(state)
})

store.dispatch({
  type: 'PLUS'
})

unsubscribe()

store.dispatch({
  type: 'MINUS'
})
