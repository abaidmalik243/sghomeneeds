import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'semantic-ui-react';
import Subsection from '../../../components/Section/Subsection';

/* eslint-disable react/prefer-stateless-function */
export default class FilesModal extends React.PureComponent {
  static propTypes = {
    modalProps: PropTypes.object,
    formProps: PropTypes.object,
    isCreated: PropTypes.bool,
    file: PropTypes.object,
    fieldName: PropTypes.string,
  };
  state = {
    preview: this.props.isCreated ? null : this.props.file.file_field,
  };

  render() {
    const { preview } = this.state;
    const { modalProps, fieldName, formProps } = this.props;
    return (
      <Modal {...modalProps}>
        <Subsection>
          <h1>Add/Edit Images</h1>
          <Form {...formProps} onSubmit={this.handleSubmit}>
            <div className="field">
              {/* eslint-disable-next-line jsx-a11y/label-has-for */}
              <label htmlFor="file_field">File</label>
              <input
                type="file"
                name={fieldName || 'file_field'}
                onChange={this.handleFileChange}
              />
            </div>
            <div>
              {preview && <img src={preview} alt={preview} width="100%" />}
            </div>
            <button className="ui button" type="submit">
              Submit
            </button>
          </Form>
        </Subsection>
      </Modal>
    );
  }
  handleFileChange = e => {
    this.setState({
      preview: URL.createObjectURL(e.target.files[0]),
      file_field: e.target.files[0],
    });
  };

  handleSubmit = e => {
    const data = new FormData(e.target);
    if (this.props.fieldName) {
      data.set(this.props.fieldName, this.state.file_field);
    } else {
      data.set('file_field', this.state.file_field);
    }
    if (this.props.file.listing) {
      data.set('listing', this.props.file.listing);
    }
    if (this.props.file.gallery) {
      data.set('gallery', this.props.file.gallery);
    }
    if (this.props.file.is_gallery_before_images) {
      data.set(
        'is_gallery_before_images',
        this.props.file.is_gallery_before_images,
      );
    }
    data.set('name', this.state.file_field.name);
    this.props.formProps.onSubmit(data);
  };
}
