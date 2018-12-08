import { call, put, takeLatest } from 'redux-saga/effects';
import { get, post, LISTINGS, MULTIPART_FORM_DATA } from '../actions/restApi';

function* fetchListings(action) {
  if (action.type === LISTINGS.GET.REQUESTED) {
    try {
      const response = yield call(get, {
        model: LISTINGS.MODEL,
        id: action.payload.id,
      });
      yield put({ type: LISTINGS.GET.SUCCESS, payload: response.data });
    } catch (e) {
      yield put({ type: LISTINGS.GET.FAILED, payload: e.message });
    }
  }
  if (action.type === LISTINGS.LIST.REQUESTED) {
    try {
      const response = yield call(get, {
        model: LISTINGS.MODEL,
        query: action.payload.query,
      });
      yield put({ type: LISTINGS.LIST.SUCCESS, payload: response.data });
    } catch (e) {
      yield put({ type: LISTINGS.LIST.FAILED, payload: e.message });
    }
  }
  if (action.type === LISTINGS.CREATE.REQUESTED) {
    try {
      const response = yield call(post, {
        model: LISTINGS.MODEL,
        data: action.payload.data,
        contentType: MULTIPART_FORM_DATA,
      });
      yield put({ type: LISTINGS.CREATE.SUCCESS, payload: response.data });
    } catch (e) {
      yield put({ type: LISTINGS.CREATE.FAILED, payload: e.message });
    }
  }
}

function* mySaga() {
  yield [
    takeLatest(LISTINGS.LIST.REQUESTED, fetchListings),
    takeLatest(LISTINGS.GET.REQUESTED, fetchListings),
    takeLatest(LISTINGS.CREATE.REQUESTED, fetchListings),
  ];
}

export default mySaga;
