import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

function StaticData() {

    const dataInput = { width: '4rem', height: '3rem', borderRadius: '5px', borderWidth: '0', background: '#C4C4C4' };
    const centerText = { textAlign: 'center' };
    const rowPadding = { paddingTop: '0' };

    return (
        <div>
            <Grid centered textAlign='center' columns={6}>
                <Grid.Row style={rowPadding}>
                    <Grid.Column>
                        <h3 style={centerText}>Round Trip (mi)</h3>
                    </Grid.Column>
                    <Grid.Column>
                        <h3 style={centerText}>Miles Per Gallon (mpg)</h3>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={rowPadding}>
                    <Grid.Column style={centerText}>
                        <input style={dataInput} type="text" />
                    </Grid.Column>
                    <Grid.Column style={centerText}>
                        <input style={dataInput} type="text" />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={rowPadding}>
                    <Grid.Column style={centerText}>
                        <Button inverted>Update</Button>
                    </Grid.Column>
                    <Grid.Column style={centerText}>
                         <Button inverted>Update</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default StaticData;
