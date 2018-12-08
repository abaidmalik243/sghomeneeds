import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { getSlug } from '../../utils/slugify';
import NavBar from '../../components/NavigationBar';

import Footer from '../../components/Footer';
import { MERCHANTS } from '../../actions/restApi';

import injectReducer from '../../utils/injectReducer';
import reducer from '../../reducers/merchant';
import injectSaga from '../../utils/injectSaga';
import saga from '../../sagas/merchant';
import { RESTART_ON_REMOUNT } from '../../utils/constants';
import SearchBar from '../../components/SearchBar';

const ITEMS_PER_PAGE = 10;

const mapDispatchToProps = dispatch => ({
  getMerchants: payload => {
    dispatch({ type: MERCHANTS.LIST.REQUESTED, payload });
  },
});

const mapStateToProps = state => ({
  merchants: state
    .get(MERCHANTS.MODEL)
    .get(MERCHANTS.MODEL)
    .toJS(),
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
class SearchPage extends React.PureComponent {
  static propTypes = {
    // location: PropTypes.object.isRequired,
    merchants: PropTypes.array.isRequired,
    getMerchants: PropTypes.func.isRequired,
  };
  renderProfessionals() {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="baseline"
        spacing={40}
        style={{ flexGrow: 1, padding: '100px 200px', backgroundColor: '#fff' }}
      >
        {this.props.merchants.slice(0, ITEMS_PER_PAGE).map(e => (
          <Grid item xs={12} key={`${e.id}`}>
            <Paper>
              <a href={`/professionals/${e.id}/${getSlug(e.name)}`}>
                <h1>{e.name}</h1>
              </a>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }
  render() {
    return (
      <div>
        <NavBar />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="baseline"
          style={{ flexGrow: 1, padding: 100 }}
        >
          <Grid item>
            <Typography
              variant="display3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Professionals In Singapore
            </Typography>
          </Grid>
          <SearchBar
            onTextChange={event => {
              const {
                target: { value },
              } = event;
              if (value != null) {
                this.setState(() => ({ searchInput: value }));
              }
            }}
            onSearch={() => {
              window.location = `/directory?q=${this.state.searchInput}`;
            }}
          />
        </Grid>
        {this.renderProfessionals()}
        <Footer />
      </div>
    );
  }
  componentWillMount() {
    this.props.getMerchants({});
  }
  componentDidUpdate() {
    // console.log(this.props);
  }
}
export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(SearchPage);
