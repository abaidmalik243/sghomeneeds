/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import draftToHtml from 'draftjs-to-html';
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Modal, Form, Menu } from 'semantic-ui-react';
import Subsection from '../../../components/Section/Subsection';
import OneColumn from '../../../components/Section/OneColumn';
import FilesTable from './FilesTable';
import ButtonWrapper from '../../../components/Base/Button';




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
  // constructor () {
  //   super();
  //   console.log((this.props.gallery === null || this.props.gallery === undefined || this.props.gallery.about_rich_text === '' || this.props.gallery.about_rich_text === null || this.props.gallery.about_rich_text === undefined))
  // }
  state = {
    // listing: this.props.gallery ? this.props.gallery.listing : [],
    gallery: this.props.gallery,
    activeItem: 'details',
    editorState: EditorState.createEmpty(),
  };
  refs = {};
  getInitialEditorState = (gallery) => {
    try {
      if (gallery === null || gallery === undefined || gallery.about_rich_text === '' || gallery.about_rich_text === null || gallery.about_rich_text === undefined || convertFromHTML(gallery.about_rich_text) === null) {
        return EditorState.createEmpty();
      }
      return EditorState.createWithContent(ContentState.createFromBlockArray(
        convertFromHTML(gallery.about_rich_text).contentBlocks,
        convertFromHTML(gallery.about_rich_text).entityMap
      ))

    } catch (e) {
      return EditorState.createEmpty();
    }
  };
  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({editorState: this.getInitialEditorState(this.props.gallery)})
  }

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

  renderWYSIWYG(listing, fieldProps) {
    const {editorState} = this.state;
    return (
      <div className={`field listing-${fieldProps.name}`}>
        <Form.Field
          {...fieldProps}
          defaultValue={
            listing ? listing[fieldProps.name] : fieldProps.defaultValue
          }
          style={{display: 'none'}}
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
        <div className="listing-about">
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="editor"
            onEditorStateChange={this.onEditorStateChange}
          />
        </div>
      </div>
    );
  }

  render() {
    const { modalProps, formProps } = this.props;
    const { gallery, activeItem } = this.state;
    return (
      <Modal {...modalProps} closeIcon>
        <Subsection>
          {gallery ? <h1>Edit Gallery</h1> : <h1>Create Gallery</h1>}
          <Menu tabular>
            <Menu.Item
              name="details"
              active={activeItem === 'details'}
              onClick={this.handleItemClick}
            />
            {!this.props.isCreate && (
              <Menu.Item
                name="images"
                active={activeItem === 'images'}
                onClick={this.handleItemClick}
              />
            )}
          </Menu>
          <Form {...formProps} onSubmit={this.handleSubmit}>
            {activeItem === 'details' && (
              <div>
                <OneColumn>
                  <div className="select-listing">
                    <label htmlFor="listing">Listing</label>
                    <select className="ui fluid search dropdown" name="listing">
                      {this.props.listings &&
                        this.props.listings.results.map(c => (
                          <option key={v4()} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {this.renderFormField(gallery, {
                    label: 'Name',
                    control: 'input',
                    placeholder: 'Name',
                    name: 'wp_post_title',
                    defaultValue: 'Test Gallery',
                    className: 'gallery-name',
                  })}
                  {this.renderWYSIWYG(gallery, {
                    label: 'About',
                    control: 'textarea',
                    placeholder: 'About Gallery',
                    name: 'about_rich_text',
                    defaultValue: 'Lorem Ipsum',
                    className: 'gallery-about',
                  })}
                  {this.renderFormField(gallery, {
                    label: 'Property Type',
                    control: 'input',
                    placeholder: 'Property Type',
                    name: 'property_type',
                    defaultValue: 'Condo',
                    className: 'gallery-about',
                  })}
                  {this.renderFormField(gallery, {
                    label: 'Design Style',
                    control: 'input',
                    placeholder: 'Design Style',
                    name: 'design_style',
                    defaultValue: 'Muji Style',
                    className: 'gallery-style',
                  })}
                  {this.renderFormField(gallery, {
                    label: 'Estimated Cost',
                    control: 'input',
                    placeholder: 'Estimated Cost',
                    name: 'estimated_project_cost',
                    defaultValue: '$40,000',
                    className: 'gallery-cost',
                  })}
                </OneColumn>
                <ButtonWrapper
                  className="ui button"
                  type="submit"
                  design="filled"
                  style={{ marginTop: '20px' }}
                >
                  Submit
                </ButtonWrapper>
              </div>
            )}
          </Form>
          {activeItem === 'images' &&
            !this.props.isCreate && (
            <div>
              <h2 className="gallery-image-table-title">Before Images</h2>
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
          {activeItem === 'images' &&
            !this.props.isCreate && (
            <div>
              <h2 className="gallery-image-table-title">After Images</h2>
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
    this.props.formProps.onSubmit(data);
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
}
