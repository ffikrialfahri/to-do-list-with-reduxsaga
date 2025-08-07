import { all } from 'redux-saga/effects';
import { watchFetchInitialData } from './dataSaga';

export default function* rootSaga() {
  yield all([
    watchFetchInitialData(),
    // Add other sagas here
  ]);
}
