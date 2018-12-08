import { call, put, takeLatest } from 'redux-saga/effects';
import {
  get,
  post,
  put as putApi,
  patch,
  getActionModel,
  getActionApi,
  MODEL_MAP,
} from '../actions/restApi';

function* getModel(action) {
  const { payload, view } = action;
  const model = getActionModel(action.type);
  const api = getActionApi(action.type);
  try {
    const response = yield call(get, {
      model,
      id: payload.id,
    });
    yield put({
      type: MODEL_MAP[model][api].SUCCESS,
      payload: response.data,
      view,
    });
  } catch (e) {
    yield put({ type: MODEL_MAP[model][api].FAILED, payload: e.message, view });
  }
}

function* listModels(action) {
  const { payload, view } = action;
  const model = getActionModel(action.type);
  const api = getActionApi(action.type);
  try {
    const response = yield call(get, {
      model,
      query: payload.query,
    });
    yield put({
      type: MODEL_MAP[model][api].SUCCESS,
      payload: response.data,
      view,
    });
  } catch (e) {
    yield put({ type: MODEL_MAP[model][api].FAILED, payload: e.message, view });
  }
}

function* postModels(action) {
  const { payload, view, contentType } = action;
  const model = getActionModel(action.type);
  const api = getActionApi(action.type);
  try {
    const response = yield call(post, {
      model,
      data: payload.data,
      contentType,
    });
    yield put({
      type: MODEL_MAP[model][api].SUCCESS,
      payload: response.data,
      view,
    });
  } catch (e) {
    yield put({ type: MODEL_MAP[model][api].FAILED, payload: e.message, view });
  }
}

function* putModels(action) {
  const { payload, view, contentType } = action;
  const model = getActionModel(action.type);
  const api = getActionApi(action.type);
  try {
    const response = yield call(putApi, {
      model,
      data: payload.data,
      contentType,
    });
    yield put({
      type: MODEL_MAP[model][api].SUCCESS,
      payload: response.data,
      view,
    });
  } catch (e) {
    yield put({ type: MODEL_MAP[model][api].FAILED, payload: e.message, view });
  }
}

function* patchModels(action) {
  const { payload, view, contentType } = action;
  const model = getActionModel(action.type);
  const api = getActionApi(action.type);
  try {
    const response = yield call(patch, {
      model,
      data: payload.data,
      contentType,
    });
    yield put({
      type: MODEL_MAP[model][api].SUCCESS,
      payload: response.data,
      view,
    });
  } catch (e) {
    yield put({ type: MODEL_MAP[model][api].FAILED, payload: e.message, view });
  }
}

function modelSaga(model) {
  function* mySaga() {
    yield [
      takeLatest(model.LIST.REQUESTED, listModels),
      takeLatest(model.GET.REQUESTED, getModel),
      takeLatest(model.POST.REQUESTED, postModels),
      takeLatest(model.PUT.REQUESTED, putModels),
      takeLatest(model.PATCH.REQUESTED, patchModels),
    ];
  }
  return mySaga;
}

export default modelSaga;
