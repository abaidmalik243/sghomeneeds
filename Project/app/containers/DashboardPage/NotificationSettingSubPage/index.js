import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import { Checkbox } from 'semantic-ui-react';
import Card from '../../../components/Base/Card/Card';
import CardContent from '../../../components/Base/Card/CardContent';
import { generateText } from '../../../utils/loremIpsumGenerator';
import {
  PushNotificationSettings,
  TextSettings,
  EmailSettings,
} from './content';
// import { DASHBOARD_VIEW } from '../../../reducers/dashboard';
import SubPageWrapper from '../SubpageWrapper';
import SubPageDescription from '../SubpageWrapper/SubPageDescription';
import SubPageContent from '../SubpageWrapper/SubPageContent';
import './styles.css';

/* eslint-disable react/prefer-stateless-function */
export default class NotificationSettingSubPage extends React.PureComponent {
  static propTypes = {
    currentTab: PropTypes.string,
    // dispatchAction: PropTypes.func.isRequired,
    // [DASHBOARD_VIEW]: PropTypes.object,
    // user: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {};
    // TODO: Remove stubbed state
    PushNotificationSettings.forEach(item => {
      this.state[item.settingName] = item.defaultBool;
    });
    TextSettings.forEach(item => {
      this.state[item.settingName] = item.defaultBool;
    });
    EmailSettings.forEach(item => {
      this.state[item.settingName] = item.defaultBool;
    });
  }

  renderSettings(title, settingsList) {
    const settingsListJsx = settingsList.map(item => (
      <CardContent className="setting-box" key={v4()}>
        <div className="setting-text">
          <h5>{item.settingName}</h5>
          {item.settingDesc ? <p>{item.settingDesc}</p> : null}
        </div>
        <div className="setting-toggle">
          <Checkbox
            toggle
            checked={this.state[item.settingName]}
            onChange={(e, data) => {
              const newState = { ...this.state };
              newState[item.settingName] = data.checked;
              this.setState(newState);
            }}
          />
        </div>
      </CardContent>
    ));

    return (
      <div className="setting-group">
        <h4>{title}:</h4>
        <Card>{settingsListJsx}</Card>
      </div>
    );
  }

  render() {
    const { currentTab } = this.props;
    return (
      <SubPageWrapper
        currentTab={currentTab}
        tabTitle="Notification Settings"
        tabLink="notifications"
      >
        <SubPageDescription>{generateText(200)}</SubPageDescription>
        <SubPageContent>
          {this.renderSettings(
            'Get push notifications when',
            PushNotificationSettings,
          )}
          {this.renderSettings('Text me about', TextSettings)}
          {this.renderSettings('Get email notifications when', EmailSettings)}
        </SubPageContent>
      </SubPageWrapper>
    );
  }
}
