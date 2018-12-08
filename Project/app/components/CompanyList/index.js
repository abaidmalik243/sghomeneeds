import React from 'react';
import PropTypes from 'prop-types';
import CompanyCard from './CompanyCard';

function CompanyList(props) {
  return (
    <div id="company-list">
      {props.companies.results &&
        props.companies.results.map(item => (
          <CompanyCard company={item} key={item.id} />
        ))}
    </div>
  );
}

CompanyList.propTypes = {
  companies: PropTypes.object,
};

export default CompanyList;
