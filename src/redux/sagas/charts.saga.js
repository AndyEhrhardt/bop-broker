import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//gets all 20 charts with movement 
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
function* fetchSpecialCharts() {
  console.log("in fetch special charts")
try {
  const response = yield axios.get('/api/charts/special');
  console.log(response);
  yield put({ type: 'SET_SPECIAL_CHARTS', payload: response.data });
} catch (error) {
  console.log('Charts get request failed', error);
}
}

function* chartsSaga() {
  yield takeLatest('GET_ALL_CHARTS', fetchCharts);
  yield takeLatest('GET_SPECIAL_CHARTS', fetchSpecialCharts);
}

export default chartsSaga;