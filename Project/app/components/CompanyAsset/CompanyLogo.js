import React from 'react';
import { Image } from 'semantic-ui-react';
import LogoImage from '../../images/SGHomeNeeds-Logo.png';

import './styles.css';

function CompanyLogo(props) {
  return <Image id="company-logo" src={LogoImage} {...props} />;
}

export default CompanyLogo;
