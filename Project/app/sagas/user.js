import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { get, post, put as putApi, USERS, MERCHANTS } from '../actions/restApi';
import { APPLICATION_JSON } from '../utils/actionsUtil';

function* registerUser(action) {
  try {
    const response = yield call(post, {
      model: USERS.MODEL,
      url: 'register',
      data: action.payload,
    });
    yield put({ type: USERS.REGISTER.SUCCESS, payload: response.data });
    yield put({
      type: USERS.LOGIN.REQUESTED,
      payload: {
        username: action.payload.email,
        password: action.payload.password,
      },
    });
  } catch (e) {
    yield put({
      type: USERS.REGISTER.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}
function* loginUser(action) {
  if (action.type === USERS.LOGIN.REQUESTED) {
    try {
      const response = yield call(post, {
        model: USERS.MODEL,
        url: 'login',
        data: action.payload,
      });
      yield put({ type: USERS.LOGIN.SUCCESS, payload: response.data });
      localStorage.setItem('token', response.data.token);
      yield put(push('/dashboard'));
    } catch (e) {
      yield put({
        type: USERS.LOGIN.FAILED,
        payload: {
          message: e.message,
          timestamp: Date.now().valueOf(),
        },
      });
    }
  }
}

// eslint-disable-next-line no-unused-vars
function* loadAuth(action) {
  try {
    // eslint-disable-next-line no-unused-vars
    const token = localStorage.getItem('token');
    if (token === undefined) {
      // console.log('loadAuth token === undefined');
      yield put(push('/login'));
    } else {
      const response = yield call(post, {
        model: USERS.MODEL,
        url: 'load_auth',
        data: { token },
      });
      yield put({ type: USERS.LOAD_AUTH.SUCCESS, payload: response.data });
      yield put({
        type: USERS.GET.REQUESTED,
        payload: { id: response.data.data.userId },
      });
      yield put({
        type: MERCHANTS.GET.REQUESTED,
        payload: { id: response.data.data.merchantId },
      });
    }
  } catch (e) {
    yield put({ type: USERS.LOAD_AUTH.FAILED, payload: e.message });
  }
}

function* fetchUser(action) {
  if (action.type === USERS.GET.REQUESTED) {
    try {
      const response = yield call(get, {
        model: USERS.MODEL,
        id: action.payload.id,
      });
      yield put({ type: USERS.GET.SUCCESS, payload: response.data });
    } catch (e) {
      yield put({ type: USERS.GET.FAILED, payload: e.message });
    }
  }
}

function* updateUser(action) {
  if (action.type === USERS.PATCH.REQUESTED) {
    try {
      const response = yield call(putApi, {
        model: USERS.MODEL,
        id: action.payload.id,
        data: action.payload.data,
        contentType: APPLICATION_JSON,
      });
      yield put({ type: USERS.PATCH.SUCCESS, payload: response.data });
    } catch (e) {
      yield put({ type: USERS.PATCH.FAILED, payload: e.message });
    }
  }
}

function* mySaga() {
  yield [
    takeLatest(USERS.REGISTER.REQUESTED, registerUser),
    takeLatest(USERS.LOGIN.REQUESTED, loginUser),
    takeLatest(USERS.GET.REQUESTED, fetchUser),
    takeLatest(USERS.PATCH.REQUESTED, updateUser),
    takeLatest(USERS.LOAD_AUTH.REQUESTED, loadAuth),
  ];
}

export default mySaga;
