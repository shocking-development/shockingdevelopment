import React from 'react';
import { Accordion } from 'semantic-ui-react';

/* A simple static component to render the home page when users are logged in. */
function RequestQuestions() {

  const panels = [
    {
      key: 'why-add-car',
      title: 'Why do I need to add my car?',
      content: {
        content: (
            <div>
              <p style={{ color: '#7abeff' }}>
                Adding your car will enable us to better calculate your savings, emissions, and miles driven. </p>
            </div>
        ),
      },
    },
    {
      key: 'add-car',
      title: 'How do I add my car?',
      content: {
        content: (
            <div style={{ paddingBottom: '10px' }}>
              <p style={{ color: '#7abeff' }}>
                Simply choose the year of your car from the drop down.
                <br/>
                Next, choose the make of your car. For instance, Honda or
                Audi.
                <br/>
                Then add the model of your car, like continental GT for a 2020 Bentley.
              </p>
            </div>
        ),
      },
    },
    {
      key: 'dont-see-car',
      title: 'What if I do not see my car?',
      content: {
        content: (
            <div style={{ paddingBottom: '10px' }}>
              <p style={{ color: '#7abeff' }}>
                If you do not see your car please contact admin through the request page.
              </p>
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
export default RequestQuestions;
