import React from 'react';
import { Table, Dropdown } from 'semantic-ui-react';

function WeeklyUpdate() {

    const transportationOptions = [
        {
            key: 'Telework',
            text: 'Telework',
            value: 'Telework'
        },
        {
            key: 'Public Transportation',
            text: 'Public Transportation',
            value: 'Public Transportation'
        },
        {
            key: 'Biking',
            text: 'Biking',
            value: 'Biking'
        },
        {
            key: 'Walk',
            text: 'Walk',
            value: 'Walk'
        },
        {
            key: 'Carpool',
            text: 'Carpool',
            value: 'Carpool'
        },
        {
            key: 'Electric Vehicle',
            text: 'Electric Vehicle',
            value: 'Electric Vehicle'
        }
    ]
    return (
        <div style={{ paddingTop: '5rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Table celled style={{ width: '60%', textAlign: 'center' }} column={5}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={3}>Monday</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Tuesday</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Wednesday</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Thursday</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Friday</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell><Dropdown placeholder='Select transportation' fluid selection options={transportationOptions} /></Table.Cell>
                        <Table.Cell><Dropdown placeholder='Select transportation' fluid selection options={transportationOptions} /></Table.Cell>
                        <Table.Cell><Dropdown placeholder='Select transportation' fluid selection options={transportationOptions} /></Table.Cell>
                        <Table.Cell><Dropdown placeholder='Select transportation' fluid selection options={transportationOptions} /></Table.Cell>
                        <Table.Cell><Dropdown placeholder='Select transportation' fluid selection options={transportationOptions} /></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}

export default WeeklyUpdate;
