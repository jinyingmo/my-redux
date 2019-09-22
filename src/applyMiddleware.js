const applyMiddleware = (...middlewares) => {
  return createStore => {
    return (reducer, initState) => {
      const store = createStore(reducer, initState)
      //遍历middlewares，并传入store
      const middlewares2 = middlewares.map(middleware => middleware(store))
      let dispatch = store.dispatch
      //为了保证前后顺序的一致，middlewares先反转再逐个执行
      middlewares2.reverse().forEach(middleware => {
        dispatch = middleware(dispatch)
      })
      store.dispatch = dispatch
      return store
    }
  }
}

export { applyMiddleware }
