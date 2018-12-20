/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Grid, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import moment from 'moment';

import './chat-page-channels.css';
import Avatar from '../../components/Base/Avatar';

/* eslint-disable react/prefer-stateless-function */
export default class ChatPageChannels extends React.PureComponent {
  static propTypes = {
    channels: PropTypes.array.isRequired,
    channelFilter: PropTypes.string,
    // messages: PropTypes.object,
    user: PropTypes.object.isRequired,
    selectedChannel: PropTypes.object,
    setSelectedChannel: PropTypes.func,
    getChannelInfo: PropTypes.func,
    setChannelFilter: PropTypes.func,
  };

  formatMsgTime = unix => {
    const now = moment();
    const msgTime = moment(unix);
    if (
      now.dayOfYear() !== msgTime.dayOfYear() ||
      now.year() !== msgTime.year()
    ) {
      return msgTime.format('DD/MM/YYYY');
    }
    return msgTime.format('LT');
  };

  render() {
    const {
      channels,
      channelFilter,
      user,
      selectedChannel,
      setSelectedChannel,
      getChannelInfo,
      setChannelFilter,
    } = this.props;

    let displayChannels = channels;
    if (user.isLoggedIn) {
      // filter on userID and nickname of other member
      if (channelFilter) {
        const filter = channelFilter.toLowerCase();
        displayChannels = displayChannels.filter(channel => {
          const other =
            channel.members[0].userId === user.user.username
              ? channel.members[1]
              : channel.members[0];
          return (
            other.nickname.toLowerCase().includes(filter) ||
            other.userId.toLowerCase().includes(filter)
          );
        });
      }
    }

    const channelJsx = displayChannels.map(channel => {
      const latestMsg =
        channel.lastMessage !== undefined ? channel.lastMessage : null;
      // messages && messages[channel.url]
      //   ? messages[channel.url].slice(-1)[0]
      //   : null;
      return (
        <Grid.Row
          className="chat-channel-single"
          key={v4()}
          onClick={() => {
            setSelectedChannel(channel);
          }}
          style={{
            backgroundColor:
              selectedChannel.url === channel.url
                ? 'rgba(204, 255, 204,0.2)'
                : 'white',
          }}
        >
          <Grid.Column>
            <Avatar
              size={50}
              src="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
            />
            <div>
              <div className="last-message-head">
                <h4>{getChannelInfo(channel, user.user.username).other}</h4>
                <span className="last-message-time">
                  {latestMsg !== null &&
                    this.formatMsgTime(latestMsg.createdAt)}
                </span>
              </div>
              <p>
                {latestMsg !== null &&
                  latestMsg.messageType === 'user' &&
                  `${latestMsg._sender.nickname}: ${latestMsg.message}`}
                {latestMsg !== null &&
                  latestMsg.messageType === 'file' &&
                  `${latestMsg._sender.nickname}: File`}
                {latestMsg !== null &&
                  latestMsg.messageType === 'admin' &&
                  `${latestMsg.message}`}
                {latestMsg === null && 'No messages'}
              </p>
            </div>
          </Grid.Column>
        </Grid.Row>
      );
    });

    return (
      <div className="chat-channels">
        <Input
          icon="search"
          placeholder="All conversations"
          value={channelFilter}
          onChange={setChannelFilter}
        />
        <div className="channel-rows">
          <Grid celled="internally">{channelJsx}</Grid>
        </div>
      </div>
    );
  }
}
