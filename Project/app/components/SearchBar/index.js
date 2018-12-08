import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import './styles.css';
/* eslint-disable react/prefer-stateless-function */
export default class SearchBar extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object,
    placeholder: PropTypes.string,
    width: PropTypes.string,
    fluid: PropTypes.bool,
    inputStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
  };

  state = {
    value: '',
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <div
          className={`ui large action input ${this.props.fluid ? 'fluid' : ''}`}
        >
          <input
            className="search-input seach_input"
            type="text"
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.handleChange}
            style={{ ...this.props.inputStyle, fontSize: '15px' }}
          />

          <button
            className="ui icon button seach_bar_btn" style={{borderRadius:'0'}}
            // style={{ ...this.props.buttonStyle }}
          >
            <div>
              <i className="search icon" />
            </div>
          </button>
        </div>
      </form>
    );
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.search(this.state.value);
  };

  search = query => {
    const search = queryString.stringify({
      search: query,
    });
    const target = `/directory?${search}`;
    this.props.history.push(target);
  };
}
