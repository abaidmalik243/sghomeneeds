import React from 'react';
import PropTypes from 'prop-types';
import { Form as Formio } from 'react-formio';

import PaperWrapper from '../Base/Paper/index';
import Subsection from '../Section/Subsection';
import './formio-bootstrap.css';
import './formio.css';
import './form.css';
import ButtonWrapper from '../Base/Button';

class Form extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string,
    onSubmit: PropTypes.func,
    submission: PropTypes.object,
    showForm: PropTypes.bool,
  };
  state = {
    formPage: 0,
  };

  render() {
    const { showForm } = this.props;
    const showSubmit =
      this.form &&
      this.form.formio &&
      this.state.formPage === this.form.formio.pages.length - 1;
    return (
      <Subsection
        style={{
          paddingBottom: '10px',
          maxWidth: '1024px',
          display: showForm ? '' : 'none',
        }}
      >
        <PaperWrapper>
          <Subsection style={{ paddingBottom: '10px' }}>
            <Formio
              src={this.props.url}
              onNextPage={this.onPageChange}
              onPrevPage={this.onPageChange}
              submission={this.props.submission}
              ref={r => {
                this.form = r;
              }}
            />
            {showSubmit && (
              <ButtonWrapper design="filled" onClick={this.props.onSubmit}>
                Submit
              </ButtonWrapper>
            )}
          </Subsection>
        </PaperWrapper>
      </Subsection>
    );
  }
  componentDidMount() {
    // const formio = new Formio('https://sghomeneeds-formio.herokuapp.com/test');
    // console.log(formio);
  }
  onPageChange = d => {
    this.setState({ formPage: d.page });
  };
}

export default Form;
