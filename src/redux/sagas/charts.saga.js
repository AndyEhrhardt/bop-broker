import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchCharts() {
    console.log("in fetch charts")
  try {
    const response = yield axios.get('/api/charts');
    console.log(response);
    yield put({ type: 'SET_CHARTS', payload: response.data });
  } catch (error) {
    console.log('Charts get request failed', error);
  }
}

function* chartsSaga() {
  yield takeLatest('GET_ALL_CHARTS', fetchCharts);
}

export default chartsSaga;