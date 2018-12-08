import React from 'react';
import PropTypes from 'prop-types';
import PaperWrapper from '../../components/Base/Paper/index';
import Subscribe from '../../components/Footer/Subscribe';
import Subsection from '../../components/Section/Subsection';

function SubscribePaper(props) {
  return (
    <PaperWrapper id="subscribe-paper">
      <Subsection>
        <Subscribe
          headerText={<h2>Subscribe Us:</h2>}
          buttonText="Subscribe"
          buttonType="filled"
          onSubmit={props.onSubscribe}
          onNameChange={props.onNameChange}
          onEmailChange={props.onEmailChange}
        />
      </Subsection>
    </PaperWrapper>
  );
}

SubscribePaper.propTypes = {
  onSubscribe: PropTypes.func,
  onNameChange: PropTypes.func,
  onEmailChange: PropTypes.func,
};

export default SubscribePaper;
