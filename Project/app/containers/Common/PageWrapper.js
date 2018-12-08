import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import NavBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';

/* eslint-disable react/prefer-stateless-function */
export default class TemplatePage extends React.PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };
  state = {
    showMenu: false,
  };
  render() {
    return (
      <MediaQuery query="(max-width: 1000px)">
        {isPhone => (
          <div>
            <NavBar
              showMenu={isPhone ? this.state.showMenu : true}
              showToggle={isPhone}
              onToggle={this.onToggle}
              {...this.props}
            />
            {this.props.children}
            <Footer />
          </div>
        )}
      </MediaQuery>
    );
  }
  onToggle = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };
}
