import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Subsection from '../../../components/Section/Subsection';
import { generateText } from '../../../utils/loremIpsumGenerator';
import TwoColumn from '../../../components/Section/TwoColumn';
import {
  PushNotificationSettings,
  TextSettings,
  EmailSettings,
} from './content';
// import { DASHBOARD_VIEW } from '../../../reducers/dashboard';
import PaperWrapper from '../../../components/Base/Paper';

/* eslint-disable react/prefer-stateless-function */
export default class NotificationSettingSubPage extends React.PureComponent {
  static propTypes = {
    currentTab: PropTypes.string,
    // dispatchAction: PropTypes.func.isRequired,
    // [DASHBOARD_VIEW]: PropTypes.object,
    // user: PropTypes.object.isRequired,
  };
  render() {
    const { currentTab } = this.props;
    return (
      <div style={{ display: currentTab === 'comments' ? 'inherit' : 'none' }}>
        <TwoColumn>
          <Grid.Column>
            <Subsection className="dashboard-sub-page-title">
              <h3>Notification Setting:</h3>
              <p>{generateText(200)}</p>
            </Subsection>
          </Grid.Column>
          <Grid.Column>
            <h3>Get Push Notification When:</h3>
            <PaperWrapper className="paper">
              {PushNotificationSettings.map(item => (
                <Subsection className="setting-box">
                  <TwoColumn>
                    <Grid.Column>
                      <h2>{item.settingName}</h2>
                      <p>{item.settingDesc}</p>
                    </Grid.Column>
                    <Grid.Column>
                      <div className="ui toggle checkbox">
                        <input
                          type="checkbox"
                          name="public"
                          value={item.defaultBool}
                        />
                      </div>
                    </Grid.Column>
                  </TwoColumn>
                </Subsection>
              ))}
            </PaperWrapper>
            <h3>Text Me About:</h3>
            <PaperWrapper className="paper">
              {TextSettings.map(item => (
                <Subsection className="setting-box">
                  <TwoColumn>
                    <Grid.Column>
                      <h2>{item.settingName}</h2>
                    </Grid.Column>
                    <Grid.Column>
                      <div className="ui toggle checkbox">
                        <input
                          type="checkbox"
                          name="public"
                          value={item.defaultBool}
                        />
                      </div>
                    </Grid.Column>
                  </TwoColumn>
                </Subsection>
              ))}
            </PaperWrapper>
            <h3>Get Push Notification When:</h3>
            <PaperWrapper className="paper">
              {EmailSettings.map(item => (
                <Subsection className="setting-box">
                  <TwoColumn>
                    <Grid.Column>
                      <h2>{item.settingName}</h2>
                      <p>{item.settingDesc}</p>
                    </Grid.Column>
                    <Grid.Column>
                      <div className="ui toggle checkbox">
                        <input
                          type="checkbox"
                          name="public"
                          value={item.defaultBool}
                        />
                      </div>
                    </Grid.Column>
                  </TwoColumn>
                </Subsection>
              ))}
            </PaperWrapper>
          </Grid.Column>
        </TwoColumn>
      </div>
    );
  }
}
