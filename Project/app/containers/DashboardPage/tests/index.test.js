import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import SearchPage from '../index';
import messages from '../messages';

describe('<DirectoryPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<SearchPage />);
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.header} />),
    ).toEqual(true);
  });
});
