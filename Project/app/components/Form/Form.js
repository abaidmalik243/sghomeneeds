import React from 'react';
import PropTypes from 'prop-types';
import { Form as Formio } from 'react-formio';

import PaperWrapper from '../Base/Paper/index';
import Subsection from '../Section/Subsection';
import './formio-bootstrap.css';
import './formio.css';
import './form.css';

class Form extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string,
    onSubmit: PropTypes.func,
    submission: PropTypes.object,
  };
  state = {
    formPage: 0,
  };

  render() {
    const showSubmit =
      this.form &&
      this.form.formio &&
      this.state.formPage === this.form.formio.pages.length - 1;
    return (
      <Subsection style={{ paddingBottom: '10px', maxWidth: '1024px' }}>
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
              <button onClick={this.props.onSubmit}>Submit</button>
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
