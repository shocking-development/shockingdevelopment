import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Grid, Header } from 'semantic-ui-react';
import { Emissions } from '../../../api/emissions/EmissionsCollection';

function RecentlyAdded() {

  const user = useTracker(() => Meteor.userId());
  const emissions = useTracker(() => {
    Meteor.subscribe(Emissions.emissionsPublicationName);
    return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 }, limit: 3 }).fetch();
  });

  return (
      <div>
        {emissions.length !== 0 ?
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Grid>
                <Grid.Row columns={emissions.length}>
                  {emissions.map(recentEmissions => <Grid.Column
                      key={toString(recentEmissions.createdAt) + recentEmissions.transportation + recentEmissions.miles}>
                    <Card style={{ padding: '1rem', background: '#0DA3CB', width: '25em', height: '10em', boxShadow: 'none' }}>
                      <Card.Content>
                        <Card.Header
                            style={{ color: 'white' }}>{`${recentEmissions.date.getMonth() + 1}/${recentEmissions.date.getDate()}/${recentEmissions.date.getFullYear()}`}</Card.Header>
                      </Card.Content>
                      <Card.Content style={{ color: 'white' }}>
                        <b>Transportation: {recentEmissions.transportation}</b>
                        <br/>
                        <b>Miles: {recentEmissions.miles}</b>
                      </Card.Content>
                    </Card></Grid.Column>)}
                </Grid.Row>
              </Grid>
            </div>
            : <Header inverted size='huge' textAlign='center' style={{ fontWeight: '100' }}>You have not added any
              emissions</Header>}
      </div>
  );
}

export default RecentlyAdded;
