import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import MediaQuery from 'react-responsive';
import renderHTML from 'react-render-html';

import ThreeColumn from '../../components/Section/ThreeColumn';
import TemplatePage from '../Common/PageWrapper';
import ImageBannerSection from '../../components/Section/ImageBannerSection';
import Section from '../../components/Section/Section';
import SearchBar from '../../components/SearchBar';
import Subsection from '../../components/Section/Subsection';
import PaperWrapper from '../../components/Base/Paper';

import injectReducer from '../../utils/injectReducer';
import servicesReducer from '../../reducers/services';
import injectSaga from '../../utils/injectSaga';
import { CATEGORIES, LISTINGS } from '../../actions/restApi';
import categorySaga from '../../sagas/category';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import './services-page.css';
import LinkWrapper from '../../components/Base/Link';
import { categories } from './data';
import { getS3Image } from '../../utils/images';

const banner = getS3Image(
  '/images/ServicesPage/apartment-architecture-carpet-584399.png',
);

export const SERVICES_VIEW = 'services';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: SERVICES_VIEW });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  [SERVICES_VIEW]: state.get(SERVICES_VIEW).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: SERVICES_VIEW,
  reducer: servicesReducer,
});

const withSaga = injectSaga({
  key: `${SERVICES_VIEW}/${CATEGORIES.MODEL}`,
  saga: categorySaga,
  mode: DAEMON,
});
const withListingSaga = injectSaga({
  key: LISTINGS.MODEL,
  saga: saga(LISTINGS),
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class ServicesPage extends React.PureComponent {
  static propTypes = {
    // [SERVICES_VIEW]: PropTypes.object,
    dispatchAction: PropTypes.func.isRequired,
  };

  setInitialState = () => {
    const categoriesMap = {};
    const popularList = [];
    const parentMap = {};
    categories.results.forEach(category => {
      categoriesMap[category.id] = category;
      if (category.popular !== null) {
        popularList.push(category.id);
      }
      category.parent.forEach(p => {
        if (parentMap[p] === undefined) {
          parentMap[p] = [];
        }
        parentMap[p].push(category.id);
      });
    });
    return { categoriesMap, popularList, parentMap };
  };

  state = this.setInitialState();
  renderMoreServicesPaper = p => {
    const { categoriesMap, parentMap } = this.state;
    return (
      categoriesMap[p] && (
        <PaperWrapper className="paper category-links" key={v4()}>
          <div className="category-links-title">
            <LinkWrapper href={`/services/${categoriesMap[p].slug}`}>
              <h3>{renderHTML(categoriesMap[p].name)}</h3>
            </LinkWrapper>
          </div>
          <div className="category-links-links">
            {parentMap[p].map(s => (
              <p key={v4()}>
                <LinkWrapper
                  key={v4()}
                  href={`/services/${categoriesMap[s].slug}`}
                >
                  {renderHTML(categoriesMap[s].name)}
                </LinkWrapper>
              </p>
            ))}
          </div>
        </PaperWrapper>
      )
    );
  };
  renderMoreServices1Column = () => {
    const { categoriesMap, parentMap } = this.state;
    const col = Object.keys(parentMap)
      .sort(
        (a, b) =>
          categoriesMap[a] &&
          categoriesMap[b] &&
          categoriesMap[a].name.trim() < categoriesMap[b].name.trim()
            ? -1
            : 1,
      )
      .map(p => this.renderMoreServicesPaper(p));
    return (
      <Grid.Column key={v4()} className="category-links">
        {col}
      </Grid.Column>
    );
  };
  renderMoreServices3Columns = () => {
    const { categoriesMap, parentMap } = this.state;
    // this method tries to create 3 roughly equal length columns while
    // still making sure that the columns are alphabetically sorted downwards
    const columns = [[], [], []];
    const colCount = [0, 0, 0];
    Object.keys(parentMap)
      .sort(
        (a, b) =>
          categoriesMap[a] &&
          categoriesMap[b] &&
          categoriesMap[a].name.trim() < categoriesMap[b].name.trim()
            ? -1
            : 1,
      )
      .forEach(p => {
        const categoryPaper = this.renderMoreServicesPaper(p);
        if (categoryPaper) {
          const indexOfMinValue = colCount.reduce(
            (iMin, x, i, arr) => (x < arr[iMin] ? i : iMin),
            0,
          );
          colCount[indexOfMinValue] += parentMap[p].length + 1;
          columns[indexOfMinValue].push(categoryPaper);
        }
      });

    return columns.map(col => (
      <Grid.Column key={v4()} className="category-links">
        {col}
      </Grid.Column>
    ));
  };

  render() {
    const { categoriesMap, popularList } = this.state;
    return (
      <TemplatePage {...this.props}>
        <MediaQuery query="(max-width: 767px)">
          {isPhone => (
            <div className="service-page-wrapper">
              <ImageBannerSection
                imageSource={banner}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Subsection className="banner-title">
                  <h1>Home!</h1>
                  <p>
                    Complete your home improvement projects with right
                    professionals
                  </p>
                  <SearchBar
                    placeholder="What services do you need?"
                    inputStyle={{
                      width: isPhone ? '220px' : '400px',
                      borderRadius: '2px',
                    }}
                    buttonContent="text"
                    buttonText="Search"
                    buttonStyle={{
                      background: 'orange',
                      borderRadius: '2px',
                      fontWeight: 'normal',
                      width: '100px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                    }}
                  />
                </Subsection>
              </ImageBannerSection>
              <Section className="popular-services">
                <Subsection>
                  <h1 className="popular-title">Popular Home Services</h1>
                  <ThreeColumn stackable>
                    {popularList.map(p => (
                      <Grid.Column key={v4()}>
                        <LinkWrapper
                          href={`/services/${categoriesMap[p].slug}`}
                        >
                          <PaperWrapper className="paper category-popular">
                            <Image src={categoriesMap[p].image} />
                            <div>
                              <h3>{renderHTML(categoriesMap[p].name)}</h3>
                            </div>
                          </PaperWrapper>
                        </LinkWrapper>
                      </Grid.Column>
                    ))}
                  </ThreeColumn>
                </Subsection>
              </Section>
              <Section className="more-services">
                <Subsection>
                  <h1 className="more-services-title">More Home Services</h1>
                  <ThreeColumn stackable>
                    {isPhone
                      ? this.renderMoreServices1Column()
                      : this.renderMoreServices3Columns()}
                  </ThreeColumn>
                </Subsection>
              </Section>
            </div>
          )}
        </MediaQuery>
      </TemplatePage>
    );
  }

  componentDidMount() {
    this.props.dispatchAction({
      type: CATEGORIES.LIST.REQUESTED,
      payload: { query: { limit: 300 }, showSpinner: false },
    });
  }

  componentWillReceiveProps(nextProps) {
    const categoriesMap = {};
    const popularList = [];
    const parentMap = {};
    nextProps[SERVICES_VIEW][CATEGORIES.MODEL].LIST.results.forEach(
      category => {
        categoriesMap[category.id] = category;
        if (category.popular !== null) {
          popularList.push(category.id);
        }
        category.parent.forEach(p => {
          if (parentMap[p] === undefined) {
            parentMap[p] = [];
          }
          parentMap[p].push(category.id);
        });
      },
    );
    this.setState({ categoriesMap, popularList, parentMap });
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withListingSaga,
  withConnect,
)(ServicesPage);
