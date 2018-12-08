import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import { Modal, Form, Grid, Message } from 'semantic-ui-react';
import Subsection from '../../../components/Section/Subsection';
import ThreeColumn from '../../../components/Section/ThreeColumn';
import { listingForm } from './content';

/* eslint-disable react/prefer-stateless-function */
export default class ListingModal extends React.PureComponent {
  static propTypes = {
    modalProps: PropTypes.object,
    formProps: PropTypes.object,
  };
  render() {
    return (
      <Modal {...this.props.modalProps}>
        <Subsection>
          <h1>Create Listing</h1>
          <Form success {...this.props.formProps}>
            <ThreeColumn>
              {listingForm.fields.map(field => {
                if (field.type === 'textarea') {
                  return (
                    <Grid.Column key={v4()}>
                      <Form.Field
                        label={field.label}
                        control="textarea"
                        {...field.inputProps}
                      />
                    </Grid.Column>
                  );
                } else if (field.type === 'file') {
                  return (
                    <Grid.Column key={v4()}>
                      <div className="field">
                        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                        <label htmlFor={field.label}>{field.label}</label>
                        <input type="file" {...field.inputProps} />
                      </div>
                    </Grid.Column>
                  );
                }
                return (
                  <Grid.Column key={v4()}>
                    <Form.Field
                      label={field.label}
                      control="input"
                      {...field.inputProps}
                    />
                  </Grid.Column>
                );
              })}
            </ThreeColumn>
            <button className="ui button" type="submit">
              Submit
            </button>
            <Message
              success
              header="Form Completed"
              content="You created a listing"
            />
          </Form>
        </Subsection>
      </Modal>
    );
  }
}
