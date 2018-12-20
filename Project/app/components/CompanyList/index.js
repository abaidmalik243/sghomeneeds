import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import CompanyCard from './CompanyCard';
import './company-list.css';

function CompanyList(props) {
  const { selectable, onSelect, selected, goTo, companies } = props;
  return (
    <div id="company-list">
      {companies.results &&
        companies.results.map(item => (
          <CompanyCard
            company={item}
            key={v4()}
            {...{ selectable, onSelect, selected, goTo }}
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
};

export default CompanyList;
