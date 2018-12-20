import { generateApiActions } from './apiUtil';

import {
  connectSendBird,
  getMyGroupChannels,
  loadPreviousMessages,
  sendFileMessage,
  sendUserMessage,
  registerMessageHandler,
} from '../utils/SendBirdAPI';

export const CHAT_USER = {
  MODEL: 'CHAT_USER',
  CONNECT: generateApiActions('CHAT_USER', 'CONNECT'),
};

export const CHANNELS = {
  MODEL: 'CHANNELS',
  LIST: generateApiActions('CHANNELS', 'LIST'),
};

export const MESSAGES = {
  MODEL: 'MESSAGES',
  LIST: generateApiActions('MESSAGES', 'LIST'),
  SEND: generateApiActions('MESSAGES', 'SEND'),
  RECEIVE: generateApiActions('MESSAGES', 'RECEIVE'),
};

export const HANDLER = {
  MODEL: 'HANDLER',
  REGISTER: generateApiActions('HANDLER', 'REGISTER'),
};

export function connectUser({ userId, accessToken }) {
  return connectSendBird(userId, accessToken);
}

export function listChannels() {
  return getMyGroupChannels();
}

export function listMessages({ channel }) {
  return loadPreviousMessages(channel);
}

export function sendMessage({ channel, messageType, messageParams }) {
  if (messageType === 'file') {
    return sendFileMessage(channel, messageParams);
  }
  return sendUserMessage(channel, messageParams);
}

export function registerHandler({ handler }) {
  return registerMessageHandler(handler);
}
