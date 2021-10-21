import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postPortfolio(action) {
    console.log("in post portfolio ", action.payload, action.quantity)
    try {
        yield axios.post('/api/portfolio/', {data: action.payload, quantity: action.quantity});
        yield put({ type: 'GET_PORTFOLIO' });
    } 
    catch (error) {
        console.log("error posting to portfolio", error)
    }
}
function* getPortfolio() {
    try {
        const response = yield axios.get('/api/portfolio/');
        yield put({ type: 'SET_PORTFOLIO', payload: response.data });
    } 
    catch (error) {
        console.log("error getting to portfolio", error)
    }
}
function* sellSong(action) {
    console.log(action.payload)
    try {
        yield axios.delete('/api/portfolio/', {data: action.payload});
        yield put({ type: 'GET_PORTFOLIO' });
    } 
    catch (error) {
        console.log("error selling all song shares", error)
    }
}
function* updateQuantity(action){
    console.log(action)
    console.log("in")
    try{
        yield axios.put('api/portfolio', {data: {
            holding_id: action.payload.holding_id,
            sharePrice: action.price,
            numberOfShares: action.numberOfShares,
            sellState: action.sellState
        }});
        yield put({ type: 'GET_PORTFOLIO'})
    }
    catch(error){
        console.log("error updating share quantity", error)
    }
}


function* portfolioSaga() {
    yield takeLatest('POST_PORTFOLIO', postPortfolio);
    yield takeLatest('GET_PORTFOLIO', getPortfolio);
    yield takeLatest('SELL_ALL_SHARES', sellSong);
    yield takeLatest('UPDATE_SHARE_QUANTITY', updateQuantity)
  }

  export default portfolioSaga;