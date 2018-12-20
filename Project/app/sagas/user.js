import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  get,
  post,
  put as putApi,
  USERS,
  MERCHANTS,
  CONSUMERS,
} from '../actions/restApi';
import { APPLICATION_JSON } from '../utils/actionsUtil';
import { getToken, removeToken, storeToken } from '../utils/localStorage';

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
      storeToken(response.data.token);
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
    const token = getToken();
    if (token !== null) {
      const response = yield call(post, {
        model: USERS.MODEL,
        url: 'load_auth',
        data: { token },
      });
      if (response.data.data) {
        if (response.data.data.userId) {
          yield put({
            type: USERS.GET.REQUESTED,
            payload: { id: response.data.data.userId },
          });
        }
        if (response.data.data.merchantId) {
          yield put({
            type: MERCHANTS.GET.REQUESTED,
            payload: { id: response.data.data.merchantId },
          });
        }
        if (response.data.data.consumerId) {
          yield put({
            type: CONSUMERS.GET.REQUESTED,
            payload: { id: response.data.data.consumerId },
          });
        }
      }
      yield put({ type: USERS.LOAD_AUTH.SUCCESS, payload: response.data });
    }
  } catch (e) {
    yield put({ type: USERS.LOAD_AUTH.FAILED, payload: e.message });
    removeToken();
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

function* logoutUser(action) {
  if (action.type === USERS.LOGOUT.REQUESTED) {
    try {
      removeToken();
      yield put(push('/'));
      yield put({ type: USERS.LOGOUT.SUCCESS });
    } catch (e) {
      yield put({ type: USERS.LOGOUT.FAILED });
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
    takeLatest(USERS.LOGOUT.REQUESTED, logoutUser),
  ];
}

export default mySaga;
