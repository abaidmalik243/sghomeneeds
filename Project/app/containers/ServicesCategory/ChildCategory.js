import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Grid } from 'semantic-ui-react';
import Section from '../../components/Section/Section';
import Subsection from '../../components/Section/Subsection';
import Form from '../../components/Form/Form';
import CompanyList from '../../components/CompanyList';
import CustomPagination from '../../components/CustomPagination';
import './styles.css';
import { Api, API_URL, FORMIO_URL } from '../../utils/api';
import PaperWrapper from '../../components/Base/Paper';
import ButtonWrapper from '../../components/Base/Button';
import TwoColumn from '../../components/Section/TwoColumn';
import OneColumn from '../../components/Section/OneColumn';
import GetMatchedPaper from '../../components/GetMatchedPaper/GetMatchedPaper';
import SubscribePaper from '../../components/SubscribePaper/SubscribePaper';

/* eslint-disable react/prefer-stateless-function */
export default class ChildCategory extends React.Component {
  static propTypes = {
    goTo: PropTypes.func,
    listings: PropTypes.object,
    slug: PropTypes.string,
    name: PropTypes.string,
    page: PropTypes.number,
    isPhone: PropTypes.bool,
    users: PropTypes.object,
    dispatchAction: PropTypes.func,
  };
  state = {
    showForm: false,
  };
  goToPage = page => {
    const query = page > 1 ? { page } : {};
    this.props.goTo({
      search: queryString.stringify(query),
    });
  };

  render() {
    const { isPhone, slug, name, listings, page = 1, goTo } = this.props;
    const { showForm } = this.state;
    const queryLimit = 10;
    const totalPages = listings.count
      ? Math.ceil(listings.count / queryLimit)
      : 1;
    const renderPagination = () => (
      <Subsection className="pagination">
        <CustomPagination
          onPageChange={(e, data) => {
            this.goToPage(data.activePage);
          }}
          activePage={page}
          totalPages={totalPages}
          siblingRange={isPhone ? 0 : 1}
        />
      </Subsection>
    );
    return (
      <Section className="services-child">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h3>Narrow your search by answering these questions!</h3>
          {!showForm && (
            <Subsection id="form-landing">
              <PaperWrapper>
                <Subsection style={{ paddingBottom: '10px' }}>
                  <div>
                    <h1>
                      <strong>{listings.count}</strong> {name} in Singapore
                    </h1>
                    <h2>
                      We are asking you a few questions so we can bring you to
                      the right PRO
                    </h2>
                    <ButtonWrapper
                      design="filled"
                      onClick={() => {
                        this.setState({ showForm: true });
                      }}
                    >
                      Start Now
                    </ButtonWrapper>
                  </div>
                </Subsection>
              </PaperWrapper>
            </Subsection>
          )}

          <Form
            url={`${FORMIO_URL}/${slug}`}
            onSubmit={this.handleSubmit}
            ref={r => {
              this.form = r;
            }}
            showForm={showForm}
          />
        </div>
        <TwoColumn>
          <Grid.Column width={10}>
            <Subsection>
              <h3>Listings in this category</h3>
              {listings.results && listings.results.length > 0 ? (
                <div>
                  {renderPagination()}
                  <CompanyList
                    companies={listings}
                    goTo={goTo}
                    dispatchAction={this.props.dispatchAction}
                    user={this.props.users}
                  />
                  {renderPagination()}
                </div>
              ) : (
                <p>No listings found.</p>
              )}
            </Subsection>
          </Grid.Column>
          <Grid.Column width={6}>
            <Subsection style={{ width: '95%' }}>
              <OneColumn>
                <GetMatchedPaper />
              </OneColumn>
              <OneColumn>
                <SubscribePaper
                  onSubscribe={this.onSubscribe}
                  onNameChange={this.onChange}
                  onEmailChange={this.onChange}
                />
              </OneColumn>
            </Subsection>
          </Grid.Column>
        </TwoColumn>
      </Section>
    );
  }
  handleSubmit = () => {
    localStorage.setItem(
      'form',
      JSON.stringify({
        category: this.props.slug,
        form_data: this.form.form.formio.data,
      }),
    );
    const { users } = this.props;
    if (users.isLoggedIn) {
      if (
        users.LOAD_AUTH.data.consumerId !== null &&
        users.LOAD_AUTH.data.consumerId !== -1
      ) {
        this.props.goTo('/dashboard/projects/create');
      } else {
        // eslint-disable-next-line no-alert
        window.alert('Professionals cannot submit the form');
      }
    } else {
      const email = this.form.form.formio.data.Email;
      Api(`${API_URL}/api/users/exists_with_email?email=${email}`, {
        method: 'GET',
      }).then(response => {
        // Check if email is associated with a user
        const isUser = response.data.exists;
        if (isUser) {
          // Go to Login Page, with redirect to /dashboard/projects/create
          this.props.goTo('/login?redirect=/dashboard/projects/create');
        } else {
          // Go to SignUp Page, with redirect to /dashboard/projects/create
          this.props.goTo('/register?redirect=/dashboard/projects/create');
        }
      });
    }
  };
}
