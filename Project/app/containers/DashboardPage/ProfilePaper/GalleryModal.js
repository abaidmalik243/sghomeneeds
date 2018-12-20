import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import { Modal, Form } from 'semantic-ui-react';
import Subsection from '../../../components/Section/Subsection';
import OneColumn from '../../../components/Section/OneColumn';
import FilesTable from './FilesTable';

/* eslint-disable react/prefer-stateless-function */
export default class GalleryModal extends React.PureComponent {
  static propTypes = {
    modalProps: PropTypes.object,
    formProps: PropTypes.object,
    gallery: PropTypes.object,
    listings: PropTypes.object,
    isCreate: PropTypes.bool,
    dispatchAction: PropTypes.func,
  };
  state = {
    listing: this.props.gallery ? this.props.gallery.listing : [],
    gallery: this.props.gallery,
  };
  refs = {};

  renderFormField(listing, fieldProps) {
    return (
      <Form.Field
        {...fieldProps}
        defaultValue={
          listing ? listing[fieldProps.name] : fieldProps.defaultValue
        }
      />
    );
  }
  render() {
    const { modalProps, formProps } = this.props;
    const { gallery } = this.state;
    return (
      <Modal {...modalProps}>
        <Subsection>
          {gallery ? <h1>Edit Gallery</h1> : <h1>Create Gallery</h1>}
          <Form {...formProps} onSubmit={this.handleSubmit}>
            <OneColumn>
              <select className="ui fluid search dropdown" name="listing">
                {this.props.listings &&
                  this.props.listings.results.map(c => (
                    <option key={v4()} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
              {this.renderFormField(gallery, {
                label: 'Name',
                control: 'input',
                placeholder: 'Name',
                name: 'wp_post_title',
                defaultValue: 'Test Gallery',
              })}
              {this.renderFormField(gallery, {
                label: 'About',
                control: 'textarea',
                placeholder: 'About Gallery',
                name: 'about_rich_text',
                defaultValue: 'Lorem Ipsum',
              })}
              {this.renderFormField(gallery, {
                label: 'Property Type',
                control: 'input',
                placeholder: 'Property Type',
                name: 'property_type',
                defaultValue: 'Condo',
              })}
              {this.renderFormField(gallery, {
                label: 'Design Style',
                control: 'input',
                placeholder: 'Design Style',
                name: 'design_style',
                defaultValue: 'Muji Style',
              })}
              {this.renderFormField(gallery, {
                label: 'Estimated Cost',
                control: 'input',
                placeholder: 'Estimated Cost',
                name: 'estimated_project_cost',
                defaultValue: '$40,000',
              })}
            </OneColumn>
            <button className="ui button" type="submit">
              Submit
            </button>
          </Form>
          {!this.props.isCreate && (
            <div>
              <h2>Before Images</h2>
              <FilesTable
                files={gallery.files.filter(
                  f => f.is_gallery_before_images === true,
                )}
                dispatchAction={this.props.dispatchAction}
                galleryId={gallery.id}
                isBefore
              />
            </div>
          )}
          {!this.props.isCreate && (
            <div>
              <h2>After Images</h2>
              <FilesTable
                files={gallery.files.filter(
                  f => f.is_gallery_before_images === false,
                )}
                dispatchAction={this.props.dispatchAction}
                galleryId={gallery.id}
                isBefore={false}
              />
            </div>
          )}
        </Subsection>
      </Modal>
    );
  }
  handleSubmit = e => {
    const data = new FormData(e.target);
    const files = ['logo', 'video'];
    files.forEach(f => {
      if (this.state[f]) {
        data.set(f, this.state[f]);
      }
    });
    this.props.formProps.onSubmit(data);
  };
}
