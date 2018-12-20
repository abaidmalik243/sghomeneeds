import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import Subsection from '../../components/Section/Subsection';
import PaperWrapper from '../../components/Base/Paper';
import OneColumn from '../../components/Section/OneColumn';

/* eslint-disable react/prefer-stateless-function */
export default class ParentCategory extends React.Component {
  static propTypes = {
    childrenCategories: PropTypes.array,
    parent: PropTypes.object,
  };

  render() {
    const { parent, childrenCategories: children } = this.props;

    return (
      <Subsection className="services-parent">
        <h3>
          What{' '}
          <span style={{ textDecoration: 'underline' }}>{parent.name}</span>{' '}
          service are you looking for?
        </h3>
        <PaperWrapper>
          <OneColumn>
            {children.map(c => (
              <Grid.Column key={v4()}>
                <div className="subcategory-row">
                  <a href={`/services/${c.slug}`}>
                    <h4>{c.name.replace('&amp;', '&')}</h4>
                  </a>
                </div>
              </Grid.Column>
            ))}
          </OneColumn>
        </PaperWrapper>
        {parent.description ? (
          <div>
            <h4>Description of the {parent.name} category</h4>
            <p style={{ textAlign: 'left' }}>{parent.description}</p>
          </div>
        ) : null}
      </Subsection>
    );
  }
}
