import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Table, Button } from 'semantic-ui-react';
import { Emissions } from '../../../api/emissions/EmissionsCollection';
import { EmissionsRemoveMethod } from '../../../api/emissions/EmissionsCollection.methods';

function AllEmissions() {

    const user = useTracker(() => Meteor.userId());
    const emissions = useTracker(() => {
      Meteor.subscribe(Emissions.emissionsPublicationName);
      return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 } }).fetch();
    });

    const deleteEmission = ({ _id }) => EmissionsRemoveMethod.call(_id);

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '73%' }}>
              <Table>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Transportation</Table.HeaderCell>
                    <Table.HeaderCell>Miles</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {emissions.map(emission => <Table.Row key={emission._id}>
                        <Table.Cell>{`${emission.date.getMonth() + 1}/${emission.date.getDate()}/${emission.date.getFullYear()}`}</Table.Cell>
                        <Table.Cell>{emission.transportation}</Table.Cell>
                        <Table.Cell>{emission.miles}</Table.Cell>
                        <Table.Cell><Button inverted color='red' onClick={() => deleteEmission(emission)}>Delete</Button></Table.Cell>
                    </Table.Row>)}
                </Table.Body>
            </Table>
        </div>
        </div>
    );
}

export default AllEmissions;
