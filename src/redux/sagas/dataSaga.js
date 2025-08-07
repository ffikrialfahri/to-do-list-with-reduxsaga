import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_INITIAL_DATA,
} from '../actions/actionTypes';
import { fetchDataSuccess, fetchDataFailure } from '../actions/dataActions';
import { fetchLocation } from '../../services/geoService';
import { fetchWeather } from '../../services/weatherService';

function* fetchInitialDataSaga() {
  try {
    const locationResponse = yield call(fetchLocation);
    const { latitude, longitude, city } = locationResponse.data;

    const weatherResponse = yield call(fetchWeather, latitude, longitude);
    const weatherData = weatherResponse.data;

    yield put(fetchDataSuccess({ locationData: { city, latitude, longitude }, weatherData }));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchFetchInitialData() {
  yield takeLatest(FETCH_INITIAL_DATA, fetchInitialDataSaga);
}
