/*增加一个参数 plan*/

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

function reducer(state, action) {
  switch (action.type) {
    case 'PLUS':
      return {
        ...state,
        count: state.count + 1
      }
    case 'MINUS':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}

let initState = {
  count: 0
}

let store = createStore(reducer, initState)
store.subscribe(() => {
  let state = store.getState()
  console.log(state.count)
})

store.changeState({
  type: 'PLUS'
})
