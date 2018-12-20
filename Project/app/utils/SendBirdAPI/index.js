import SendBird from 'sendbird';
import uuid from 'uuid/v4';

const APP_ID = '85A0255B-E2C7-4BE9-8081-80E46958655A';
const sb = new SendBird({ appId: APP_ID });

export const connectSendBird = (userId, accessToken) => {
  const USER_ID = userId;
  const ACCESS_TOKEN = accessToken;
  return new Promise((resolve, reject) => {
    sb.connect(
      USER_ID,
      ACCESS_TOKEN,
      (sendBirdUser, error) => {
        if (error) {
          reject(error);
        }
        resolve(sendBirdUser);
      },
    );
  });
};

export const createGroupChannel = userIds => {
  const params = new sb.GroupChannelParams();
  params.isPublic = false;
  params.isEphemeral = false;
  params.isDistinct = false;
  params.addUserIds(userIds);
  params.operators = userIds;
  return new Promise((resolve, reject) => {
    sb.GroupChannel.createChannel(params, (groupChannel, error) => {
      if (error) {
        reject(error);
      }
      resolve(groupChannel);
    });
  });
};

export const getMyGroupChannels = () => {
  const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
  channelListQuery.includeEmpty = true;
  channelListQuery.limit = 20; // pagination limit could be set up to 100

  if (channelListQuery.hasNext) {
    return new Promise((resolve, reject) => {
      channelListQuery.next((channelList, error) => {
        if (error) {
          reject(error);
        }
        resolve(channelList);
      });
    });
  }
  return null;
};

export const loadPreviousMessages = groupChannel => {
  const prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
  prevMessageListQuery.limit = 100;
  prevMessageListQuery.reverse = false;
  return new Promise((resolve, reject) => {
    prevMessageListQuery.load((messages, error) => {
      if (error) {
        reject(error);
      }
      resolve(messages);
    });
  });
};

export const sendUserMessage = (channel, messageParams) => {
  const { message, data, customType } = messageParams;
  const params = new sb.UserMessageParams();
  params.message = message;
  params.data = data;
  params.customType = customType;
  return new Promise((resolve, reject) => {
    sb.GroupChannel.getChannel(channel.url, (groupChannel, error) => {
      if (error) {
        reject(error);
      }
      groupChannel.sendUserMessage(params, (msg, e) => {
        if (e) {
          reject(e);
        }
        resolve(msg);
      });
    });
  });
};

export const sendFileMessage = (channel, messageParams) => {
  const { file, name, type, size, data, customType } = messageParams;
  return new Promise((resolve, reject) => {
    sb.GroupChannel.getChannel(channel.url, (groupChannel, error) => {
      if (error) {
        reject(error);
      }
      groupChannel.sendFileMessage(
        file,
        name,
        type,
        size,
        data,
        customType,
        (fileMessage, e) => {
          if (e) {
            reject(e);
          }
          resolve(fileMessage);
        },
      );
    });
  });
};

export const registerMessageHandler = handler => {
  const channelHandlerId = uuid();
  return new Promise((resolve, reject) => {
    try {
      const ChannelHandler = new sb.ChannelHandler();
      ChannelHandler.onMessageReceived = handler;
      sb.addChannelHandler(channelHandlerId, ChannelHandler);
      resolve(ChannelHandler);
    } catch (e) {
      reject(e);
    }
  });
};
