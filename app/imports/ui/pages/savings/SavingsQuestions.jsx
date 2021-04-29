import React from 'react';
import { Accordion } from 'semantic-ui-react';

/* A simple static component to render the home page when users are logged in. */
function SavingsQuestions() {

  const panels = [
    {
      key: 'why-see-savings',
      title: 'Why should I compare?',
      content: {
        content: (
            <div>
              <p style={{ color: '#7abeff' }}>
                By comparing your current options with others, not only you might be able to decrease GHG usage, you might be able to save some money. </p>
            </div>
        ),
      },
    },
  ];

  return (
      <div>
        <Accordion style={{ color: 'white', paddingBottom: '10px' }} className={'accordionForTheDropdown'} defaultActiveIndex={0}
                   panels={panels}/>
      </div>
  );
}

/* Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default SavingsQuestions;
