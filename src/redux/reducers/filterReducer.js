import {
  SET_FILTER_STATUS,
  SET_FILTER_CATEGORY,
  SET_SEARCH_KEYWORD,
} from '../actions/actionTypes';

const initialState = {
  status: 'All',
  category: 'All',
  keyword: '',
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SET_FILTER_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case SET_SEARCH_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
