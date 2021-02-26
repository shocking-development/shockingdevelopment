import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Header, Grid } from 'semantic-ui-react';
import { DataCollection } from '../../api/data/DataCollection';

function RecentlyAdded() {

    const user = useTracker(() => Meteor.userId());
    const data = useTracker(() => {
    Meteor.subscribe('data');
    return DataCollection.find({ owner: user }, { sort: { createdAt: -1 }, limit: 3 }).fetch();
    });

    return (
        <div style={{ paddingTop: '3rem' }}>
            <Header inverted size='huge' textAlign={'center'}>Recently Added</Header>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Grid>
                    <Grid.Row columns={3}>
                        {data.map(recentData => <Grid.Column key={toString(recentData.createdAt) + recentData.transportation + recentData.miles}>
                        <Card style={{ padding: '1rem', background: '#4282AF', width: '25em', height: '10em' }}>
                        <Card.Content>
                        <Card.Header style={{ color: 'white' }}>{recentData.date}</Card.Header>
                        </Card.Content>
                        <Card.Content style={{ color: 'white' }}>
                        <b>Transportation: {recentData.transportation}</b>
                        <br/>
                        <b>Miles: {recentData.miles}</b>
                        </Card.Content>
                        </Card></Grid.Column>)}
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    );
}

export default RecentlyAdded;
