import {
  SET_FILTER_STATUS,
  SET_FILTER_CATEGORY,
  SET_SEARCH_KEYWORD,
} from './actionTypes';

export const setFilterStatus = (status) => ({
  type: SET_FILTER_STATUS,
  payload: status,
});

export const setFilterCategory = (category) => ({
  type: SET_FILTER_CATEGORY,
  payload: category,
});

export const setSearchKeyword = (keyword) => ({
  type: SET_SEARCH_KEYWORD,
  payload: keyword,
});
