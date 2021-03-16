import React from 'react';
import { Button } from 'semantic-ui-react';

function StaticData() {

    const dataInput = { width: '4rem', height: '3rem', borderRadius: '5px', borderWidth: '0', background: '#C4C4C4', fontSize: '2rem', textAlign: 'center' };
    const centerText = { textAlign: 'center', color: 'white' };

    return (
        <div>
            <h3 style={centerText}>Miles Per Gallon (mpg)</h3>
            <input style={dataInput} id='#add-mpg'type="text" />
            <br/>
            <br/>
            <Button inverted id='update-mpg'>Update</Button>
        </div>
    );
}

export default StaticData;
