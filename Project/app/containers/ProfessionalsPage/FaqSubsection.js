import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'semantic-ui-react';
// import { generateText } from '../../utils/loremIpsumGenerator';
import PaperWrapper from '../../components/Base/Paper';
import Subsection from '../../components/Section/Subsection';
// import CustomPagination from '../../components/CustomPagination';

/* eslint-disable react/prefer-stateless-function */
export default class FaqSubsection extends React.PureComponent {
  static propTypes = {
    professional: PropTypes.object,
    // faqActivePage: PropTypes.number,
  };

  state = { activeIndex: -1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    // const { faqActivePage } = this.props;
    const { activeIndex } = this.state;

    // const stubData = [
    //   {
    //     title: `${generateText(50)}?`,
    //     content: generateText(300),
    //   },
    //   {
    //     title: `${generateText(30)}?`,
    //     content: generateText(100),
    //   },
    //   {
    //     title: `${generateText(40)}?`,
    //     content: generateText(200),
    //   },
    //   {
    //     title: `${generateText(50)}?`,
    //     content: generateText(400),
    //   },
    //   {
    //     title: `${generateText(10)}?`,
    //     content: generateText(300),
    //   },
    // ];
    let faqData = [];
    if (
      this.props.professional.faq_data &&
      this.props.professional.faq_data.items
    ) {
      if (this.props.professional.faq_data.items.length > 0) {
        faqData = this.props.professional.faq_data.items;
      }
    }

    const faqContent = faqData.map((data, index) => {
      const iconStyle = activeIndex === index ? 'minus' : 'plus';
      const iconClass = `icon ${iconStyle} circle`;
      return (
        <div
          key={data.title + data.content}
          style={{
            borderTop: '1px rgb(225, 225, 225) solid',
            padding: '4px 0',
          }}
        >
          <Accordion.Title
            active={activeIndex === index}
            index={index}
            onClick={this.handleClick}
          >
            <span style={{ fontWeight: 'bold' }}>{index + 1}.</span>{' '}
            {data.title}
            <i className={iconClass} style={{ float: 'right' }} />
          </Accordion.Title>
          <Accordion.Content active={activeIndex === index}>
            <p>{data.content}</p>
          </Accordion.Content>
        </div>
      );
    });

    return (
      <Subsection id="faq">
        <PaperWrapper className="paper">
          <h1>FAQ:</h1>
          <Accordion
            fluid
            style={{ borderBottom: '1px rgb(225, 225, 225) solid' }}
          >
            {faqContent}
          </Accordion>
          {/* <div style={{ textAlign: 'center', margin: '20px' }}> */}
          {/* <CustomPagination activePage={faqActivePage} totalPages={5} /> */}
          {/* </div> */}
        </PaperWrapper>
      </Subsection>
    );
  }
}
