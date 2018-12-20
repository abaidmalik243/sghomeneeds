/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import { Modal, Form, Grid, Dropdown } from 'semantic-ui-react';
import { isEqual } from 'lodash';
import Subsection from '../../../components/Section/Subsection';
import { listingForm, categories } from './content';
import TwoColumn from '../../../components/Section/TwoColumn';
import OneColumn from '../../../components/Section/OneColumn';
import FilesTable from './FilesTable';
import FormIO from '../../../components/Form/ProfessionalsForm'
/* eslint-disable react/prefer-stateless-function */
export default class ListingModal extends React.PureComponent {
  static propTypes = {
    modalProps: PropTypes.object,
    formProps: PropTypes.object,
    categories: PropTypes.object,
    listing: PropTypes.object,
    isCreate: PropTypes.bool,
    dispatchAction: PropTypes.func,
  };
  state = {
    hiddenCategoryValue: this.props.listing
      ? this.props.listing.categories
      : [],
    listing: this.props.listing === null ? {} : this.props.listing,
  };
  formio = {};

  renderCategoryDropdown(listing) {
    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor="categories">Categories</label>
        <Dropdown
          fluid
          multiple
          search
          selection
          options={categories.results.filter(c => c.parent.length > 0).map(c => ({
            key: v4(),
            value: c.id,
            text: c.name,
          }))}
          defaultValue={listing ? listing.categories : []}
          onChange={(e, data) => {
            this.setState({ hiddenCategoryValue: data.value });
          }}
        />
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
      <div className="field">
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor={fieldProps.label}>{fieldProps.label}</label>
        <input
          type="file"
          {...fieldProps.inputProps}
          // ref={this.references[fieldProps.inputProps.name]}
          onChange={e => {
            this.handleFileChange(e, listing, fieldProps);
          }}
        />

        {listing &&
          listing[fieldProps.inputProps.name] &&
          typeof listing[fieldProps.inputProps.name] === 'string' &&
          <img src={listing[fieldProps.inputProps.name]} alt="" width="100%"/>
        }
      </div>
    );
  }

  render() {
    const { modalProps, formProps } = this.props;
    const { listing } = this.state;
    return (
      <Modal {...modalProps}>
        <Subsection>
          {listing ? <h1>Edit Listing</h1> : <h1>Create Listing</h1>}
          <Form {...formProps} onSubmit={this.handleSubmit}>
            <OneColumn>
              {this.renderCategoryDropdown(listing)}
              {this.renderFormField(listing, {
                label: 'Name',
                control: 'input',
                placeholder: 'Name',
                name: 'name',
                defaultValue: 'Test Merchant',
              })}
              {this.renderFormField(listing, {
                label: 'Address',
                control: 'textarea',
                placeholder: 'Address',
                name: 'address',
                defaultValue: 'Lorem Ipsum',
              })}
              {this.renderFormField(listing, {
                label: 'About',
                control: 'textarea',
                placeholder: 'About Me',
                name: 'about_rich_text',
                defaultValue: 'Lorem Ipsum',
              })}
              {this.renderFormField(listing, {
                label: 'Description',
                control: 'textarea',
                placeholder: 'Description',
                name: 'description',
                defaultValue: 'Lorem Ipsum',
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
              <Grid.Column key={v4()}>
                {this.renderFileInput(listing, {
                  label: 'Video',
                  inputProps: {
                    name: 'video',
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
                  })}
              </Grid.Column>
              {listingForm.fields.map(field => (
                <input key={v4()} type="hidden" {...field.inputProps} />
              ))}
            </TwoColumn>
            {!this.props.isCreate && this.state.hiddenCategoryValue.map(categoryId => {
              const c = this.getCategory(categoryId);
              const k = v4();
              return (
                <div key={k}>
                  <h2>{c.name} Options</h2>
                  <FormIO
                    url={`https://sghomeneeds-formio.herokuapp.com/professionals/${c.slug}`}
                    submission={{data: listing.form_data[c.slug] !== undefined ? listing.form_data[c.slug] : {}}}
                    ref={f => {this.formio[c.slug] = f}}
                  />
                </div>
              )
            })}
            <button className="ui button" type="submit">
              Submit
            </button>
          </Form>
          {!this.props.isCreate && (
            <div>
              <h1>Listing Images</h1>
              <FilesTable
                files={listing.files}
                dispatchAction={this.props.dispatchAction}
                listingId={listing.id}
              />

            </div>
          )}
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

  handleSubmit = e => {
    const data = new FormData(e.target);
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
    data.set('form_data', JSON.stringify(formData));
    const files = ['logo', 'video'];
    files.forEach(f => {
      if (this.state[f]) {
        data.set(f, this.state[f]);
      }
    });
    this.props.formProps.onSubmit(data);
  };
  getCategory = categoryId => categories.results.filter(c => c.id === categoryId)[0]
}
