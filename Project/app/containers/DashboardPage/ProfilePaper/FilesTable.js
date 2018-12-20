import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Modal } from 'semantic-ui-react';
import 'react-table/react-table.css';
import ButtonWrapper from '../../../components/Base/Button';
import FilesModal from './FilesModal';
import { FILES } from '../../../actions/restApi';
import { MULTIPART_FORM_DATA } from '../../../utils/actionsUtil';
import Subsection from '../../../components/Section/Subsection';

// import v4 from 'uuid/v4';
// import {
//   Modal,
//   Form,
//   Grid,
//   Message,
//   Select,
//   Dropdown,
// } from 'semantic-ui-react';
// import Subsection from '../../../components/Section/Subsection';
// import TwoColumn from '../../../components/Section/TwoColumn';
// import OneColumn from '../../../components/Section/OneColumn';

/* eslint-disable react/prefer-stateless-function */
export default class FilesTable extends React.PureComponent {
  static propTypes = {
    dispatchAction: PropTypes.func,
    files: PropTypes.array,
    listingId: PropTypes.number,
    galleryId: PropTypes.number,
    isBefore: PropTypes.bool,
  };

  render() {
    const data = this.props.files;
    const columns = [
      {
        Header: 'Image',
        accessor: 'file_field',
        Cell: props => <img src={props.value} alt={props.value} width="100%" />,
      },
      {
        Header: 'Edit',
        accessor: 'id',
        Cell: props => (
          <FilesModal
            modalProps={{
              dimmer: 'inverted',
              trigger: (
                <ButtonWrapper type="button" design="outline">
                  EDIT
                </ButtonWrapper>
              ),
            }}
            formProps={{
              onSubmit: formData => {
                this.props.dispatchAction({
                  type: FILES.PATCH.REQUESTED,
                  payload: { data: formData, id: props.value },
                  contentType: MULTIPART_FORM_DATA,
                });
              },
            }}
            file={props.original}
          />
        ),
      },
      {
        Header: 'Delete',
        accessor: 'id',
        Cell: props => (
          <Modal
            {...{
              dimmer: 'inverted',
              trigger: (
                <ButtonWrapper type="button" design="outline">
                  DELETE
                </ButtonWrapper>
              ),
            }}
          >
            <Subsection>
              <h1>Are you sure your want to delete?</h1>
              <ButtonWrapper
                type="button"
                design="outline"
                onClick={() => {
                  this.props.dispatchAction({
                    type: FILES.DELETE.REQUESTED,
                    payload: { id: props.value },
                  });
                }}
              >
                CONFIRM
              </ButtonWrapper>
            </Subsection>
          </Modal>
        ),
      },
    ];
    return (
      <div>
        <FilesModal
          modalProps={{
            dimmer: 'inverted',
            trigger: (
              <ButtonWrapper type="button" design="outline">
                Add Images
              </ButtonWrapper>
            ),
          }}
          formProps={{
            onSubmit: formData => {
              this.props.dispatchAction({
                type: FILES.POST.REQUESTED,
                payload: { data: formData },
                contentType: MULTIPART_FORM_DATA,
              });
            },
          }}
          file={{
            gallery: this.props.galleryId ? this.props.galleryId : null,
            listing: this.props.listingId ? this.props.listingId : null,
            is_gallery_before_images:
              this.props.isBefore === undefined ? null : this.props.isBefore,
          }}
          isCreated
        />
        <ReactTable data={data} columns={columns} defaultPageSize={5} />
      </div>
    );
  }
}
