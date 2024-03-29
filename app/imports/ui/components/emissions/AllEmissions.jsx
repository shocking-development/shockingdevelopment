import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Table, Pagination } from 'semantic-ui-react';
import { Emissions } from '../../../api/emissions/EmissionsCollection';
import EmissionItem from './EmissionItem';

function AllEmissions() {

    const [activePage, setActivePage] = useState(1);
    const startIndex = (activePage * 25 - 25);
    const endIndex = (activePage * 25);

    const emissions = useTracker(() => {
        Meteor.subscribe(Emissions.emissionsPublicationName);
        const user = Meteor.userId();
        return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 } }).fetch();
    });

    const handleInputChange = (e, data) => {
        setActivePage(Number(data.activePage));
    };

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ width: '79%' }}>
            <Pagination
                defaultActivePage={1}
                totalPages={Math.ceil(emissions.length / 25)}
                onPageChange={handleInputChange}
            />
              <Table style={{ border: 'none', textAlign: 'center' }}>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell className={'tableStylingEmissionsPage'}>Date</Table.HeaderCell>
                    <Table.HeaderCell className={'tableStylingEmissionsPage'}>Transportation</Table.HeaderCell>
                    <Table.HeaderCell className={'tableStylingEmissionsPage'}>Miles</Table.HeaderCell>
                    <Table.HeaderCell className={'tableStylingEmissionsPage'}>Delete</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {emissions.map(emission => <EmissionItem key={emission._id} emission={emission}/>).slice(startIndex, endIndex)}
                </Table.Body>
            </Table>
            <Pagination
                defaultActivePage={1}
                totalPages={Math.ceil(emissions.length / 25)}
                onPageChange={handleInputChange}
            />
        </div>
        </div>
    );
}

export default AllEmissions;
