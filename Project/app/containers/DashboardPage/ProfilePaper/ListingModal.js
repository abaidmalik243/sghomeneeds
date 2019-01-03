/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import v4 from 'uuid/v4';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Modal, Form, Grid, Dropdown, Menu } from 'semantic-ui-react';
import { isEqual } from 'lodash';
import Subsection from '../../../components/Section/Subsection';
import { listingForm } from './content';
import TwoColumn from '../../../components/Section/TwoColumn';
import OneColumn from '../../../components/Section/OneColumn';
import FilesTable from './FilesTable';
import FormIO from '../../../components/Form/ProfessionalsForm'
import './styles.css'
import ButtonWrapper from '../../../components/Base/Button';
import FAQTable from './FAQTable';
import { FORMIO_URL } from '../../../utils/api';
/* eslint-disable react/prefer-stateless-function */
export default class ListingModal extends React.Component {
  static propTypes = {
    modalProps: PropTypes.object,
    formProps: PropTypes.object,
    categories: PropTypes.object,
    listing: PropTypes.object,
    isCreate: PropTypes.bool,
    dispatchAction: PropTypes.func,
    error: PropTypes.string,
  };
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.submitButton = React.createRef();
    this.form = React.createRef();
  }
  state = {
    hiddenCategoryValue: this.props.listing
      ? this.props.listing.categories
      : [],
    parentCategoryValue: this.props.listing
      ? this.props.listing.parent_categories
      : [],
    listing: this.props.listing === null ? {} : this.props.listing,
    activeItem: 'details',
    editorState: this.props.listing === null ? EditorState.createEmpty() : EditorState.createWithContent(ContentState.createFromBlockArray(
      convertFromHTML(this.props.listing.about_rich_text).contentBlocks,
      convertFromHTML(this.props.listing.about_rich_text).entityMap
    )),
    openOptions: '',
  };
  formio = {};

  renderCategoryDropdown(listing) {
    return (
      <div className="listing-category-field">
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor="categories">Parent Categories</label>
        <Dropdown
          fluid
          multiple
          search
          selection
          options={this.props.categories.results.filter(c => c.parent.length === 0 || c.parent.indexOf(c.id) !== -1).map(c => ({
            key: v4(),
            value: c.id,
            text: renderHTML(c.name),
          }))}
          defaultValue={listing ? listing.parent_categories : []}
          onChange={(e, data) => {
            this.setState({ parentCategoryValue: data.value });
          }}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor="categories">Categories</label>
        <Dropdown
          fluid
          multiple
          search
          selection
          options={this.props.categories.results.filter(c =>
            c.parent.filter(p => this.state.parentCategoryValue.indexOf(p) !== -1).length >= 1
          ).map(c => ({
            key: v4(),
            value: c.id,
            text: renderHTML(c.name),
          }))}
          defaultValue={listing ? listing.categories : []}
          onChange={(e, data) => {
            this.setState({ hiddenCategoryValue: data.value });
          }}
        />
        <select
          className="ui fluid search dropdown"
          multiple="true"
          name="parent_categories"
          style={{ display: 'none' }}
          value={this.state.parentCategoryValue}
          readOnly
        >
          {this.state.parentCategoryValue.map(c => (
            <option key={v4()} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          className="ui fluid search dropdown"
          multiple="true"
          name="categories"
          style={{ display: 'none' }}
          value={this.state.hiddenCategoryValue}
          readOnly
        >
          {this.state.hiddenCategoryValue.map(c => (
            <option key={v4()} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    );
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
  renderFileInput(listing, fieldProps) {
    return (
      <div className={`field listing-${fieldProps.inputProps.name}`}>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor={fieldProps.label}>{fieldProps.label}</label>
        {listing &&
        listing[fieldProps.inputProps.name] &&
        typeof listing[fieldProps.inputProps.name] === 'string' && (
          <div>
            <div className="cancel-button-wrapper">
              <ButtonWrapper
                className="cancel-button"
                design="outline"
                type="button"
                onClick={() => {this.handleCancelFile(fieldProps.inputProps.name)}}
              >
                X
              </ButtonWrapper>
            </div>
            <img src={listing[fieldProps.inputProps.name]} alt="" width="100%"/>
          </div>
        )}
        <input
          type="file"
          {...fieldProps.inputProps}
          // ref={this.references[fieldProps.inputProps.name]}
          onChange={e => {
            this.handleFileChange(e, listing, fieldProps);
          }}
        />
      </div>
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
  renderVideoEmbed(listing, fieldProps) {
    return (
      <div>
        <Form.Field
          {...fieldProps}
          defaultValue={
            listing ? listing[fieldProps.name] : fieldProps.defaultValue
          }
        />
        {listing && listing[fieldProps.name] && renderHTML(listing[fieldProps.name])}
      </div>
    );
  }

  render() {
    const { modalProps, formProps, error } = this.props;
    const { listing, activeItem, openOptions } = this.state;
    return (
      <Modal {...modalProps} closeIcon>
        <Subsection>
          {listing ? <h1>Edit Listing</h1> : <h1>Create Listing</h1>}
          <Menu tabular >
            <Menu.Item name='details' active={activeItem === 'details'} onClick={this.handleItemClick} />
            <Menu.Item name='faq' active={activeItem === 'faq'} onClick={this.handleItemClick} />
            {!this.props.isCreate  && <Menu.Item name='options' active={activeItem === 'options'} onClick={this.handleItemClick} />}
            {!this.props.isCreate  && <Menu.Item name='images' active={activeItem === 'images'} onClick={this.handleItemClick} />}
          </Menu>
          <form {...formProps} onSubmit={this.handleSubmit} ref={this.form} className={`ui form ${formProps.className}`}>
            <div style={{display: activeItem === 'details' ? '' : 'none'}}>
              <OneColumn>
                {this.renderCategoryDropdown(listing)}
                {this.renderFormField(listing, {
                  label: 'Listing Name',
                  control: 'input',
                  placeholder: 'Name',
                  name: 'name',
                  defaultValue: 'Test Merchant',
                  className: 'listing-name',
                })}
                {this.renderWYSIWYG(listing, {
                  label: 'About',
                  control: 'textarea',
                  placeholder: 'About Me',
                  name: 'about_rich_text',
                  defaultValue: 'Lorem Ipsum',
                  className: 'listing-about',
                })}
                {this.renderFormField(listing, {
                  label: 'Address',
                  control: 'textarea',
                  rows: 3,
                  placeholder: 'Address',
                  name: 'address',
                  defaultValue: '',
                  className: 'listing-address',
                })}
                {this.renderFormField(listing, {
                  label: 'Postal Code',
                  control: 'input',
                  placeholder: 'Postal Code',
                  name: 'postal_code',
                  defaultValue: '',
                  className: 'listing-postal-code',
                })}
                {this.renderVideoEmbed(listing,
                  {
                    label: 'Video Embed Code',
                    control: 'textarea',
                    placeholder: 'Video Embed',
                    name: 'video_embed_code',
                    defaultValue: '',
                    className: 'listing-video-embed',
                  })}
              </OneColumn>
              <TwoColumn>
                <Grid.Column key={v4()}>
                  {this.renderFileInput(listing, {
                    label: 'Logo',
                    inputProps: {
                      name: 'logo',
                    },
                  })}
                </Grid.Column>
                <Grid.Column>
                  {this.renderFormField(listing,
                    {
                      label: 'Email',
                      control: 'input',
                      placeholder: 'Email',
                      name: 'email',
                      defaultValue: 'sghomeneeds.dev@gmail.com',
                      className: 'listing-email',
                    })}
                </Grid.Column>
                <Grid.Column>
                  {this.renderFormField(listing,
                    {
                      label: 'Phone',
                      control: 'input',
                      placeholder: 'Phone',
                      name: 'phone',
                      className: 'listing-phone',
                    })}
                </Grid.Column>
                <Grid.Column>
                  {this.renderFormField(listing,
                    {
                      label: 'Website',
                      control: 'input',
                      placeholder: 'website',
                      name: 'website',
                      defaultValue: '',
                      className: 'listing-website',
                    })}
                </Grid.Column>
                <Grid.Column>
                  {this.renderFormField(listing,
                    {
                      label: 'Facebook',
                      control: 'input',
                      placeholder: 'Facebook',
                      name: 'facebook',
                      defaultValue: '',
                      className: 'listing-facebook',
                    })}
                </Grid.Column>
                <Grid.Column>
                  {this.renderFormField(listing,
                    {
                      label: 'Twitter',
                      control: 'input',
                      placeholder: 'Twitter',
                      name: 'twitter',
                      defaultValue: '',
                      className: 'listing-twitter',
                    })}
                </Grid.Column>
                {listingForm.fields.map(field => (
                  <input key={v4()} type="hidden" {...field.inputProps} />
                ))}
              </TwoColumn>
            </div>

            {activeItem === 'faq' && (
              <div>
                <FAQTable faqData={listing.faq_data}/>
              </div>
            )}
            {activeItem === 'options' && !this.props.isCreate && this.state.hiddenCategoryValue.map(categoryId => {
              const c = this.getCategory(categoryId);
              const k = v4();
              return (
                <div key={k}>
                  <h2 className="listing-options-title">{renderHTML(c.name)} Options <ButtonWrapper
                    type="button" design="outline" onClick={() => {
                      if (openOptions === c.name) {
                        this.setState({openOptions: ''});
                      } else {
                        this.setState({openOptions: c.name});
                      }
                    }}>
                    {openOptions === c.name && '-'}
                    {openOptions !== c.name && '+'}
                  </ButtonWrapper></h2>
                  <div style={{ display: openOptions === c.name ? 'block' : 'none' }}>
                    <FormIO
                      url={`${FORMIO_URL}/professionals/${c.slug}`}
                      submission={{data: listing.form_data[c.slug] !== undefined ? listing.form_data[c.slug] : {}}}
                      ref={f => {this.formio[c.slug] = f}}
                    />
                  </div>
                </div>
              )
            })}
            <ButtonWrapper
              style={{display: ['details', 'faq', 'options'].indexOf(activeItem) !== -1 ? 'inline-block' : 'none'}}
              className="ui button listing-submit"
              design="filled"
              type="submit"
              inputRef={el => {this.submitButton = el}}
            >
              Submit
            </ButtonWrapper>
          </form>
          {activeItem === 'images' && !this.props.isCreate && (
            <div>
              <h1 className="listing-image-table-title">Listing Images</h1>
              <FilesTable
                files={listing.files}
                dispatchAction={this.props.dispatchAction}
                listingId={listing.id}
              />

            </div>
          )}
          <ButtonWrapper
            style={{display: ['details', 'faq', 'options'].indexOf(activeItem) === -1 ? 'inline-block' : 'none'}}
            className="ui button listing-submit"
            design="filled"
            type="submit"
            onClick={() => {this.handleSubmit()}}
          >
            Submit
          </ButtonWrapper>
          {error && <p style={{color: 'red'}}>{error}</p>}
        </Subsection>
      </Modal>
    );
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.listing, this.props.listing)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ listing: this.props.listing });
    }
  }
  handleFileChange = (e, listing, fieldProps) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.state.listing[fieldProps.inputProps.name] = reader.result;
      this.forceUpdate();
      this.setState({
        [fieldProps.inputProps.name]: file,
      });
    };

    reader.readAsDataURL(file);
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleCancelFile = f => {
    this.state.listing[f] = '';
    this.setState({
      [f]: '',
    });
    this.forceUpdate();
  };
  handleSubmit = e => {
    let data;
    if (e) {
      e.preventDefault();
      data = new FormData(e.target);
    } else {
      data = new FormData(this.form.current);
    }
    const formData = {};
    Object.keys(this.formio).forEach(k => {
      if (this.formio[k]) {
        formData[k] = this.formio[k].props.submission.data;
      }
    });
    // eslint-disable-next-line no-restricted-syntax
    for (const key of data.keys()) {
      if (/^data\[[a-zA-Z0-9]+\]\[\]$/.test(key)) {
        data.delete(key);
      }
    }
    data.set('form_data', JSON.stringify (formData));
    const files = ['logo', 'video'];
    files.forEach(f => {
      if (this.state[f] || this.state[f] === '') {
        data.set(f, this.state[f]);
      }
    });
    this.props.formProps.onSubmit(data);
  };
  getCategory = categoryId => this.props.categories.results.filter(c => c.id === categoryId)[0]

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
}
