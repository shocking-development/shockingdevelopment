import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { GraphOptions } from '../../components/defaultcharts/SavingsPageBarGraph';
import { Cars } from '../../../api/cars/CarsCollection';

export function SaveingsGraphCard(name, description, info, icon, data1, data2) {

  // In page styling for the graphs.
  const dataPageBarGraphstyling = {
    background: 'transparent',
    borderRadius: '5px',
    paddingTop: '5px',
    paddingRight: '5px',
    color: 'black',
  };

  // In page styling for within the display cards
  // eslint-disable-next-line no-unused-vars
  const inCardStyle = {
    textSize: 50,
  };

  return (

          <Card style={{ background: 'rgba(0, 73, 122, 0.5)', boxShadow: 'none' }}>
            <Card.Content>
              <div align="right"><Icon inverted name={icon}/></div>
              <Card.Header className={'CarcardFont'}>{name}</Card.Header>
              <Card.Meta className={'CarcardFont'}>{description}</Card.Meta>
              <Card.Description className={'CarcardFont'}>{info}</Card.Description>
            </Card.Content>
            <Card.Content>
              <div style={dataPageBarGraphstyling}>
                {GraphOptions(data1, data2)}
              </div>
            </Card.Content>
            <Card.Content extra color='teal'>
              <Button color='teal'>See results</Button>
            </Card.Content>
          </Card>

  );

}

export default withTracker(() => {
  // Get access to Cars documents.
  const subscription = Cars.subscribeCars();
  return {
    ready: subscription.ready(),
  };
})(SaveingsGraphCard);
