import React from 'react';
import { Accordion } from 'semantic-ui-react';

/* A simple static component to render the home page when users are logged in. */
function RequestQuestions() {

  const panels = [
    {
      key: 'why-request',
      title: 'Why should I contact Admin for?',
      content: {
        content: (
            <div>
              <p style={{ color: '#7abeff' }}>
                Feel free to contact Admin for following reasons
              <ul>
                <li> You do not see your car model.</li>
                <li> You would like to delete your account.</li>
                <li> You are having difficulties with your account.</li>
                <li> You have recommendations for improvements.</li>
              </ul>
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
