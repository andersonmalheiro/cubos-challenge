import { combineReducers } from 'redux';
import search from './search';

// Combinação de todos os reducers da aplicação
const mainReducer = combineReducers({
  search,
});

// Reseta a store quando for feito logout
const rootReducer = (state: any, action: any) => {
  return mainReducer(state, action);
};

// Exportando o tipo dos reducers
export type AppState = ReturnType<typeof mainReducer>;
export default rootReducer;
