import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchSongDetails(action) {
    console.log("in fetch song details", action.payload)
  try {
    const response = yield axios.get('/api/charts');
    console.log(response);
    yield put({ type: 'SET_SONG_DETAILS', payload: response.data });
  } catch (error) {
    console.log('Charts get request failed', error);
  }
}

function* songSaga() {
  yield takeLatest('GET_SONG_DETAILS', fetchSongDetails);
}

export default songSaga;