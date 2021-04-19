import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Table, Pagination, Icon, Header } from 'semantic-ui-react';
import { Emissions } from '../../../api/emissions/EmissionsCollection';
import EmissionItemForHomePage from '../../components/emissions/EmissionItemForHomePage';
import { UserEmissionData } from '../../components/defaultcharts/UserEmissionsData';

function EmissionForHome() {

  const [activePage, setActivePage] = useState(1);
  const startIndex = (activePage * 5 - 5);
  const endIndex = (activePage * 5);

  const emissions = useTracker(() => {
    Meteor.subscribe(Emissions.emissionsPublicationName);
    const user = Meteor.userId();
    return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 } }).fetch();
  });

  const handleInputChange = (e, data) => {
    setActivePage(Number(data.activePage));
  };

  return (
      <div style={{ width: '90%', margin: 'auto' }}>
        {UserEmissionData('Emissions').length !== 0 ?
            <div>
              <Table style={{ border: 'none' }} className={'headerdataPage'}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell className={'headerdataPage'}>Date</Table.HeaderCell>
                    <Table.HeaderCell className={'headerdataPage'}>Transportation</Table.HeaderCell>
                    <Table.HeaderCell className={'headerdataPage'}>Miles</Table.HeaderCell>
                    <Table.HeaderCell className={'headerdataPage'}>Delete</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {emissions.map(emission => <EmissionItemForHomePage key={emission._id}
                                                           emission={emission}/>).slice(startIndex, endIndex)}
                </Table.Body>

              </Table>
              <Pagination
                  defaultActivePage={1}
                  totalPages={Math.ceil(emissions.length / 5)}
                  onPageChange={handleInputChange}
                  className={'headerdataPage'}
                  firstItem={{ content: <Icon inverted name="angle double left"/> }}
                  lastItem={{ content: <Icon inverted name="angle double right"/> }}
                  prevItem={{ content: <Icon inverted name="angle left"/> }}
                  nextItem={{ content: <Icon inverted name="angle right"/> }}
                  style={{ boxShadow: 'none', border: 'none' }}
                  pointing
                  secondary

              />
            </div> :
            <Header inverted as="h3" textAlign="center" style={{ marginTop: '10%' }}>
              Add Emissions to view your chart.
            </Header>}
      </div>
  );
}

export default EmissionForHome;
