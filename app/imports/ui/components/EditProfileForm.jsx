import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';

class EditProfileForm extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                NAME
                            </Grid.Column>
                            <Grid.Column width={9}>
                                <input type="text" />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={4}>
                                EMAIL
                            </Grid.Column>
                            <Grid.Column width={9}>
                                <input type="text" />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={4}>
                                USERNAME
                            </Grid.Column>
                            <Grid.Column width={9}>
                                <input type="text" />
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </Container>
            </div>
        );
    }
}

export default EditProfileForm;
