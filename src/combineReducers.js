const combineReducers = reducers => {
  const reducerKeys = Object.keys(reducers)

  return (state = {}, action) => {
    const nextState = {}
    reducerKeys.forEach(item => {
      const reducer = reducers[item]
      const singalNextState = reducer(state[item], action)
      nextState[item] = singalNextState
    })
    return nextState
  }
}

export { combineReducers }
