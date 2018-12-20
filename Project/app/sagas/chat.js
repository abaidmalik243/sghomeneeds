import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CHANNELS,
  CHAT_USER,
  MESSAGES,
  HANDLER,
  connectUser,
  listChannels,
  listMessages,
  sendMessage,
  registerHandler,
} from '../actions/chatApi';

function* handleChatUser(action) {
  try {
    const { payload, view } = action;
    const { userId, accessToken } = payload;
    const chatUser = yield call(connectUser, { userId, accessToken });
    yield put({
      type: CHAT_USER.CONNECT.SUCCESS,
      payload: { chatUser },
      view,
    });
  } catch (e) {
    yield put({
      type: CHAT_USER.CONNECT.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* fetchChannels(action) {
  try {
    const { view } = action;
    const channels = yield call(listChannels, {});
    yield put({
      type: CHANNELS.LIST.SUCCESS,
      payload: { channels },
      view,
    });
  } catch (e) {
    yield put({
      type: CHANNELS.LIST.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* fetchMessages(action) {
  try {
    const { payload, view } = action;
    const { channel } = payload;
    const messages = yield call(listMessages, { channel });
    yield put({
      type: MESSAGES.LIST.SUCCESS,
      payload: { channel, messages },
      view,
    });
  } catch (e) {
    yield put({
      type: MESSAGES.LIST.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* sendMessages(action) {
  try {
    const { payload, view } = action;
    const { channel, messageType, messageParams } = payload;
    const message = yield call(sendMessage, {
      channel,
      messageType,
      messageParams,
    });
    yield put({
      type: MESSAGES.SEND.SUCCESS,
      payload: { channel, message },
      view,
    });
  } catch (e) {
    yield put({
      type: MESSAGES.SEND.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* receiveMessages(action) {
  try {
    const { payload, view } = action;
    const { channel, message } = payload;
    yield put({
      type: MESSAGES.RECEIVE.SUCCESS,
      payload: { channel, message },
      view,
    });
  } catch (e) {
    yield put({
      type: MESSAGES.RECEIVE.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* registerChannelHandler(action) {
  try {
    const { payload, view } = action;
    const { handler } = payload;
    const h = yield call(registerHandler, {
      handler,
    });
    yield put({
      type: HANDLER.REGISTER.SUCCESS,
      payload: { handler: h },
      view,
    });
  } catch (e) {
    yield put({
      type: HANDLER.REGISTER.FAILED,
      payload: {
        message: e.message,
        timestamp: Date.now().valueOf(),
      },
    });
  }
}

function* mySaga() {
  yield [
    takeLatest(CHAT_USER.CONNECT.REQUESTED, handleChatUser),
    takeLatest(CHANNELS.LIST.REQUESTED, fetchChannels),
    takeLatest(MESSAGES.LIST.REQUESTED, fetchMessages),
    takeLatest(MESSAGES.SEND.REQUESTED, sendMessages),
    takeLatest(MESSAGES.RECEIVE.REQUESTED, receiveMessages),
    takeLatest(HANDLER.REGISTER.REQUESTED, registerChannelHandler),
  ];
}

export default mySaga;
