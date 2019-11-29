/**
 * Generate a Action Creator
 *
 * @export
 * @param {*} type
 * @param {*} argNames
 * @returns
 */
export function makeActionCreator(type, ...argNames) {
  return function(...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

/**
 * Generate a reducer
 *
 * @param {*} initialState
 * @param {*} handlers
 * @returns
 */
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
