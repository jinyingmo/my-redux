const nextLogger = store => dispatch => action => {
  dispatch(action)
  console.log('next state', store.getState())
}
export { nextLogger }
