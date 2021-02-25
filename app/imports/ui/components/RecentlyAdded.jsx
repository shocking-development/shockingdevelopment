import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Header } from 'semantic-ui-react';
import { DataCollection } from '../../api/data/DataCollection';

function RecentlyAdded() {

    const user = useTracker(() => Meteor.userId());
    const data = useTracker(() => {
    Meteor.subscribe('data');
    return DataCollection.find({ owner: user }, { sort: { createdAt: -1 }, limit: 3 }).fetch();
    });

    return (
        <div style={{ paddingTop: '3rem', width: '100%', justifyContent: 'center' }}>
            <Header inverted size='huge' textAlign={'center'}>Recently Added</Header>
            {data.map(recentData => <Card key={toString(recentData.date)} style={{ padding: '1rem', background: '#4282AF' }}>
                    <Card.Content>
                    <Card.Header style={{ color: 'white' }}>{recentData.date}</Card.Header>
                    </Card.Content>
                    <Card.Content style={{ color: 'white' }}>
                    <b>Transportation: {recentData.transportation}</b>
                    <br/>
                    <b>Miles: {recentData.miles}</b>
                    </Card.Content>
                    </Card>)}
        </div>
    );
}

export default RecentlyAdded;
