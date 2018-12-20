/* eslint-disable react/no-danger,no-underscore-dangle */
import React from 'react';
import { Grid, Image, Card, Select } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import v4 from 'uuid/v4';
import QueryString from 'query-string';
import ThreeColumn from '../../components/Section/ThreeColumn';
import TemplatePage from '../Common/PageWrapper';
import Section from '../../components/Section/Section';
import Subsection from '../../components/Section/Subsection';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { RESTART_ON_REMOUNT } from '../../utils/constants';
import './blog-page.css';
import blogReducer, { BLOG_VIEW } from '../../reducers/blog';
import blogSaga from '../../sagas/blog';
import { WP_CATEGORIES, WP_POSTS } from '../../actions/wpApi';
import CustomPagination from '../../components/CustomPagination';
import LinkWrapper from '../../components/Base/Link';

const POSTS_PER_PAGE = 6;

const mapDispatchToProps = dispatch => ({
  dispatchAction: (action, payload) => {
    dispatch({
      type: action,
      payload,
      view: BLOG_VIEW,
    });
  },
  goTo: path => {
    dispatch(push(path));
  },
});

const mapStateToProps = state => ({
  [BLOG_VIEW]: state.get(BLOG_VIEW).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: BLOG_VIEW,
  reducer: blogReducer,
});

const withSaga = injectSaga({
  key: `${BLOG_VIEW}`,
  saga: blogSaga,
  mode: RESTART_ON_REMOUNT,
});

/* eslint-disable react/prefer-stateless-function */
class BlogPage extends React.Component {
  static propTypes = {
    dispatchAction: PropTypes.func,
    posts: PropTypes.array,
    total: PropTypes.number,
    categories: PropTypes.array,
    location: PropTypes.object,
    search: PropTypes.string,
    match: PropTypes.object,
    goTo: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    [BLOG_VIEW]: PropTypes.object,
  };

  fetchPosts = query => {
    const fetchPostQuery = {
      per_page: POSTS_PER_PAGE,
      _embed: true,
      ...query,
    };

    if (query.categories) {
      fetchPostQuery.categories = this.getCategoryIdFromSlug(query.categories);
    }

    this.props.dispatchAction(WP_POSTS.LIST.REQUESTED, {
      query: fetchPostQuery,
    });
  };

  fetchCategories = () => {
    this.props.dispatchAction(WP_CATEGORIES.LIST.REQUESTED, {});
  };

  getCategoryIdFromSlug = slug => {
    if (!slug) return undefined;
    const { categories } = this.props[BLOG_VIEW];
    return (categories.find(category => category.slug === slug) || {}).id;
  };

  onPageChange = (e, value) => {
    const { page, categories } = this.getCurrentParams();
    if (page === value.activePage) return; // do not change if same page selected

    const query = {
      categories,
    };
    if (value.activePage !== 1) query.page = value.activePage; // only add page to query if page number is not 1
    const path = `${this.props.location.pathname}?${QueryString.stringify(
      query,
    )}`;
    this.props.goTo(path);
  };

  onCategoryChange = (e, value) => {
    const { categories = '' } = this.getCurrentParams();
    if (value.value === categories) return; // do not change if same category selected

    const query =
      value.value && value.value !== 'Select Category'
        ? { categories: value.value }
        : {};
    this.props.goTo(
      `${this.props.location.pathname}?${QueryString.stringify(query)}`,
    );
  };

  getCurrentParams = () => QueryString.parse(this.props.location.search);

  fetchPostsBasedOnParams = () => {
    const query = {};
    const { categories, page } = this.getCurrentParams();
    if (categories) query.categories = categories;
    if (page) query.page = page;
    this.fetchPosts(query);
  };

  componentDidMount() {
    if (this.props[BLOG_VIEW].categories.length === 0) {
      this.fetchCategories();
    } else {
      this.fetchPostsBasedOnParams();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(prevProps.location, this.props.location) ||
      !isEqual(
        prevProps[BLOG_VIEW].categories,
        this.props[BLOG_VIEW].categories,
      )
    ) {
      this.fetchPostsBasedOnParams();
    }
  }

  render() {
    const { posts, total, categories } = this.props[BLOG_VIEW];
    const { page: currentPage = 1 } = this.getCurrentParams();
    const categoriesList = [
      { value: 'Select Category', text: 'Select Category' },
    ];
    categories.forEach(c => {
      categoriesList.push({ value: c.slug, text: c.name });
    });
    const dangerouslyRender = content => ({
      __html: content,
    });
    const renderPost = post => (
      <Grid.Column key={v4()}>
        <LinkWrapper href={`${this.props.match.path}/${post.slug}`}>
          <Card className="post-excerpt-card">
            <Image src={post._embedded['wp:featuredmedia'][0].source_url} />
            <Card.Content>
              <h4
                dangerouslySetInnerHTML={dangerouslyRender(post.title.rendered)}
              />
              <div
                dangerouslySetInnerHTML={dangerouslyRender(
                  post.excerpt.rendered,
                )}
              />
            </Card.Content>
          </Card>
        </LinkWrapper>
      </Grid.Column>
    );
    const {
      categories: currentCategory = 'Select Category',
    } = this.getCurrentParams();
    return (
      <TemplatePage {...this.props}>
        <Section className="blog-page">
          <Subsection className="category-selector">
            <h3>I want to Read Blog posts related to: </h3>
            <Select
              options={categoriesList}
              onChange={this.onCategoryChange}
              value={currentCategory}
            />
          </Subsection>
          <Subsection className="blog-excerpts">
            <ThreeColumn stackable relaxed centered padded>
              {posts && posts.map(post => renderPost(post))}
            </ThreeColumn>
            <CustomPagination
              activePage={currentPage}
              totalPages={Math.ceil(total / POSTS_PER_PAGE)}
              onPageChange={this.onPageChange}
            />
          </Subsection>
        </Section>
      </TemplatePage>
    );
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(BlogPage);
