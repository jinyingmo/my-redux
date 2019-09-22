const prevLogger = store => dispatch => action => {
  console.log('preview state', store.getState())
  dispatch(action)
}

export { prevLogger }
