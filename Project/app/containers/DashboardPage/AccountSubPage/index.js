import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Modal, Form, Message } from 'semantic-ui-react';
import Subsection from '../../../components/Section/Subsection';
import { generateText } from '../../../utils/loremIpsumGenerator';
import Card from '../../../components/Base/Card/Card';
import CardContent from '../../../components/Base/Card/CardContent';
import TwoColumn from '../../../components/Section/TwoColumn';
import { USERS } from '../../../actions/restApi';
import { APPLICATION_JSON } from '../../../utils/actionsUtil';

/* eslint-disable react/prefer-stateless-function */
export default class AccountSubPage extends React.PureComponent {
  static propTypes = {
    profile: PropTypes.object,
    currentTab: PropTypes.string,
    user: PropTypes.object,
    dispatchAction: PropTypes.func.isRequired,
  };

  renderModal({ requestKey, formFieldProps }) {
    return (
      <Modal
        size="mini"
        trigger={<button className="ui right floated button">Edit</button>}
      >
        <Subsection>
          <Form
            onSubmit={formData => {
              this.updateUser({
                id: this.props.user.user.id,
                data: {
                  [requestKey]: formData.target[requestKey].value,
                },
                contentType: APPLICATION_JSON,
              });
            }}
          >
            <Form.Field name={requestKey} {...formFieldProps} />
            <button className="ui button" type="submit">
              Submit
            </button>
            <Message success header="Form Submitted" />
          </Form>
        </Subsection>
      </Modal>
    );
  }

  render() {
    const { currentTab } = this.props;
    return (
      <div style={{ display: currentTab === 'account' ? 'inherit' : 'none' }}>
        <TwoColumn>
          <Grid.Column>
            <Subsection style={{ textAlign: 'left' }}>
              <h3>Account Settings</h3>
              <p>{generateText(200)}</p>
            </Subsection>
          </Grid.Column>
          <Grid.Column>
            <Subsection style={{ textAlign: 'left' }}>
              <Card>
                <CardContent>
                  <TwoColumn>
                    <Grid.Column width={12}>
                      <h3>Name: {this.props.user.user.first_name}</h3>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      {this.renderModal({
                        requestKey: 'first_name',
                        formFieldProps: {
                          label: 'Name',
                          control: 'input',
                          placeholder: 'Name',
                        },
                      })}
                    </Grid.Column>
                  </TwoColumn>
                </CardContent>
                <CardContent>
                  <TwoColumn>
                    <Grid.Column width={12}>
                      <h3>Email: {this.props.user.user.email}</h3>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      {this.renderModal({
                        requestKey: 'username',
                        formFieldProps: {
                          label: 'Email',
                          control: 'input',
                          placeholder: 'Email',
                        },
                      })}
                    </Grid.Column>
                  </TwoColumn>
                </CardContent>
                <CardContent>
                  <TwoColumn>
                    <Grid.Column width={12}>
                      <h3>Phone Number: {this.props.user.user.phone_number}</h3>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      {this.renderModal({
                        requestKey: 'phone_number',
                        formFieldProps: {
                          label: 'Phone Number',
                          control: 'input',
                          placeholder: 'Phone Number',
                        },
                      })}
                    </Grid.Column>
                  </TwoColumn>
                </CardContent>
                <CardContent>
                  <TwoColumn>
                    <Grid.Column width={12}>
                      <h3>Password:</h3>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <button className="ui right floated button">Edit</button>
                    </Grid.Column>
                  </TwoColumn>
                </CardContent>
              </Card>
            </Subsection>
          </Grid.Column>
        </TwoColumn>
      </div>
    );
  }

  updateUser = payload => {
    this.props.dispatchAction({ type: USERS.PATCH.REQUESTED, payload });
  };
}
