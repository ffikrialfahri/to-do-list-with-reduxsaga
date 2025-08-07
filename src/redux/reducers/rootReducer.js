import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import todoReducer from './todoReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
  data: dataReducer,
  todos: todoReducer,
  filter: filterReducer,
});

export default rootReducer;
