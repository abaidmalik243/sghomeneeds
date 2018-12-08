import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import ServicesPage from '../index';
import messages from '../messages';

describe('<ServicesPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<ServicesPage />);
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.header} />),
    ).toEqual(true);
  });
});
