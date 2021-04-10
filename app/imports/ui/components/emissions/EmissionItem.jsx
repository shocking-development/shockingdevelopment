import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import { EmissionsRemoveMethod } from '../../../api/emissions/EmissionsCollection.methods';

function EmissionItem({ emission }) {

    const deleteEmission = ({ _id }) => EmissionsRemoveMethod.call(_id);

    return (
        <Table.Row>
            <Table.Cell>{`${emission.date.getMonth() + 1}/${emission.date.getUTCDate()}/${emission.date.getFullYear()}`}</Table.Cell>
            <Table.Cell>{emission.transportation}</Table.Cell>
            <Table.Cell>{emission.miles}</Table.Cell>
            <Table.Cell><Button inverted color='red' onClick={() => deleteEmission(emission)}>Delete</Button></Table.Cell>
        </Table.Row>
    );
}

EmissionItem.propTypes = {
    emission: PropTypes.object,
};

export default EmissionItem;
