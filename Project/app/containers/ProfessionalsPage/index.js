import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import EmailIcon from '@material-ui/icons/Email';
import NavBar from '../../components/NavigationBar';
// import TextField from '../../components/TextField';
import Footer from '../../components/Footer';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { RESTART_ON_REMOUNT } from '../../utils/constants';
import saga from '../../sagas/merchant';
import reducer from '../../reducers/merchant';

import { MERCHANTS } from '../../actions/restApi';

const mapDispatchToProps = dispatch => ({
  getMerchants: payload => {
    dispatch({ type: MERCHANTS.GET.REQUESTED, payload });
  },
});

const mapStateToProps = state => ({
  merchant: state.get(MERCHANTS.MODEL).toJS().merchant,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: MERCHANTS.MODEL, reducer });
const withSaga = injectSaga({
  key: MERCHANTS.MODEL,
  saga,
  mode: RESTART_ON_REMOUNT,
});

/* eslint-disable react/prefer-stateless-function */
class ProfessionalsPage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    merchant: PropTypes.object.isRequired,
    getMerchants: PropTypes.func.isRequired,
  };
  render() {
    return (
      <div>
        <NavBar />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="baseline"
          style={{ flexGrow: 1, padding: '10px 100px' }}
        >
          <Grid item>
            <Typography
              variant="display3"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              {this.props.merchant.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="baseline"
          style={{ flexGrow: 1, padding: '10px 100px' }}
        >
          <Grid item xs={12}>
            <Paper style={{ padding: 20 }}>
              <Typography
                variant="title"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {`Address: ${this.props.merchant.address} \nSingapore ${
                  this.props.merchant.postal_code
                }`}
              </Typography>
              <Typography
                variant="title"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {`Timing: ${this.props.merchant.timing}`}
              </Typography>
              <Typography
                variant="title"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Phone:{' '}
                <a href={`tel:${this.props.merchant.phone}`}>
                  {this.props.merchant.phone}
                </a>
              </Typography>
              <Typography
                variant="title"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Website:{' '}
                <a href={this.props.merchant.website}>
                  {this.props.merchant.website}
                </a>
              </Typography>
              <Typography
                variant="title"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                <a href={`mailto:${this.props.merchant.email}`}>
                  {this.props.merchant.email}
                </a>
                <a href={this.props.merchant.facebook}>
                  {this.props.merchant.facebook}
                </a>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
  componentWillMount() {
    const id = this.props.location.pathname.split('/')[2];
    this.props.getMerchants({ id });
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(ProfessionalsPage);
