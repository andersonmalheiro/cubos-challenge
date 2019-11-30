import { combineReducers } from 'redux';
import movies from './movies';
import detail from './detail';

// Combinação de todos os reducers da aplicação
const mainReducer = combineReducers({
  movies,
  detail,
});

// Root reducer
const rootReducer = (state: any, action: any) => {
  return mainReducer(state, action);
};

// Exportando o tipo dos reducers
export type AppState = ReturnType<typeof mainReducer>;
export default rootReducer;
