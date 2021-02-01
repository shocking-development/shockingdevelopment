import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';

class EditProfileForm extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Grid stackable columns={2} style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '20px' }}>
                        <Grid.Row>
                            <Grid.Column width={4} className="edit-profile-col">
                                NAME
                            </Grid.Column>
                            <Grid.Column>
                                <input className="edit-profile-input" type="text" />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={4} className="edit-profile-col">
                                EMAIL
                            </Grid.Column>
                            <Grid.Column>
                                <input className="edit-profile-input" type="text" />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={4} className="edit-profile-col">
                                USERNAME
                            </Grid.Column>
                            <Grid.Column>
                                <input className="edit-profile-input" type="text" />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column width={4} className="edit-profile-col">
                            PASSWORD
                          </Grid.Column>
                          <Grid.Column >
                            <input className="edit-profile-input" type="password" placeholder="ENTER CURRENT PASSWORD"/>
                          </Grid.Column>
                        </Grid.Row>

                      <Grid.Row>
                        <Grid.Column width={4}>
                        </Grid.Column>
                        <Grid.Column>
                          <input className="edit-profile-input" type="password" placeholder="ENTER NEW PASSWORD"/>
                        </Grid.Column>
                      </Grid.Row>

                      <Grid.Row>
                        <Grid.Column width={4}>
                        </Grid.Column>
                        <Grid.Column>
                          <input className="edit-profile-input" type="password" placeholder="RETYPE NEW PASSWORD"/>
                        </Grid.Column>
                      </Grid.Row>

                    </Grid>
                </Container>
            </div>
        );
    }
}

export default EditProfileForm;
