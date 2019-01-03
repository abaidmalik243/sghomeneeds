import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import CompanyCard from './CompanyCard';
import './company-list.css';

function CompanyList(props) {
  const {
    selectable,
    onSelect,
    selected,
    goTo,
    companies,
    user,
    dispatchAction,
  } = props;
  return (
    <div id="company-list">
      {companies.results &&
        companies.results.map(item => (
          <CompanyCard
            company={item}
            key={v4()}
            {...{ selectable, onSelect, selected, goTo, user, dispatchAction }}
          />
        ))}
    </div>
  );
}

CompanyList.propTypes = {
  companies: PropTypes.object,
  selectable: PropTypes.bool,
  onSelect: PropTypes.func,
  selected: PropTypes.array,
  goTo: PropTypes.func,
  user: PropTypes.object,
  dispatchAction: PropTypes.func,
};

export default CompanyList;
