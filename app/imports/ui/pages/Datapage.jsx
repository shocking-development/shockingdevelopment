import React from 'react';
import { Grid, Table, Menu, Label, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarHome from '../components/main-navbar/NavBarMain';
import DataPagePieChart from '../components/defaultcharts/DataPagePieChart';
import DataPageBarGraph from '../components/defaultcharts/DataPageBarGraph';
import DataPageDonutChart1 from '../components/defaultcharts/DataPageDonutChart1';
import DataPageDonutChart2 from '../components/defaultcharts/DataPageDonutChart2';

/** A simple static component to render the home page when users are logged in. */
class Datapage extends React.Component {

  render() {
    const pageStyle = {
      marginLeft: '20em',
      paddingTop: '8em',
      paddingBottom: '10em',
      height: '47.9em',
      backgroundSize: 'cover',
      marginTop: '-10px',
      marginRight: '6em',
      overflow: 'scroll',
    };
    return (
        <div style={{
          background: '#174060',
          backgroundSize: 'cover',
          height: '100%',
          marginTop: '-10px',
        }}>
          <NavBarHome/>

          <div style={pageStyle} className={'scrollbarfordata'}>
            <Grid stackable columns='equal'>
              <Grid.Column>
                <div style={{
                  background: 'rgb(66 130 175)',
                  borderRadius: '6px',
                  boxShadow: '-41px -1px 44px -3px #0E324C',
                  paddingTop: '10px',
                }}>
                  <DataPagePieChart/>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div style={{
                  background: 'rgb(66 130 175)',
                  borderRadius: '6px',
                  boxShadow: ' 28px 5px 44px -3px #0E324C',
                  paddingTop: '10px',
                  paddingRight: '10px',
                }}>
                  <DataPageBarGraph/>
                </div>
              </Grid.Column>
              <Grid.Row>
                <div style={{
                  background: 'rgb(66 130 175)',
                  borderRadius: '6px',
                  boxShadow: ' 28px 5px 44px -3px #0E324C',
                  paddingTop: '10px',
                  paddingRight: '10px',
                  position: 'relative',
                  left: '10px',
                  height: '100%',
                  width: '24%',
                }}>
                  <DataPageDonutChart1/>
                </div>
                <div style={{
                  background: 'rgb(66 130 175)',
                  borderRadius: '6px',
                  boxShadow: ' 28px 5px 44px -3px #0E324C',
                  paddingTop: '10px',
                  paddingRight: '10px',
                  position: 'relative',
                  left: '1em',
                  height: '100%',
                  width: '24%',
                }}>
                  <DataPageDonutChart2/>
                </div>
                <div style={{
                  background: 'white',
                  borderRadius: '6px',
                  boxShadow: ' 28px 5px 44px -3px #0E324C',
                  paddingTop: '10px',
                  paddingRight: '10px',
                  position: 'relative',
                  left: '1.29em',
                  height: '100%',
                  width: '51%',
                }}>
                  <Table style={{
                    background: 'white',
                    position: 'relative',
                    left: '1.29em',
                    height: '100%',
                    width: '94%',
                    color: 'black',
                    border: 'none',
                  }} celled>
                    <Table.Header className={'headerdataPage'}>
                      <Table.Row>
                        <Table.HeaderCell>Week</Table.HeaderCell>
                        <Table.HeaderCell>Emissions</Table.HeaderCell>
                        <Table.HeaderCell>Transportation</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Label ribbon>This Week</Label>
                        </Table.Cell>
                        <Table.Cell>.01</Table.Cell>
                        <Table.Cell>Public Transportation</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell> Last Week </Table.Cell>
                        <Table.Cell>.02 tons</Table.Cell>
                        <Table.Cell>Car</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell> 2 weeks Ago</Table.Cell>
                        <Table.Cell>.002 tons</Table.Cell>
                        <Table.Cell>Bike</Table.Cell>
                      </Table.Row>
                    </Table.Body>

                    <Table.Footer>
                      <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                          <Menu floated='right' pagination>
                            <Menu.Item as='a' icon>
                              <Icon name='chevron left'/>
                            </Menu.Item>
                            <Menu.Item as='a'>1</Menu.Item>
                            <Menu.Item as='a'>2</Menu.Item>
                            <Menu.Item as='a'>3</Menu.Item>
                            <Menu.Item as='a'>4</Menu.Item>
                            <Menu.Item as='a' icon>
                              <Icon name='chevron right'/>
                            </Menu.Item>
                          </Menu>
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>
                </div>
              </Grid.Row>
            </Grid>
          </div>
        </div>
    );
  }
}

/** Declare the types of all properties. */
Datapage.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const DatapageContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Datapage);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(DatapageContainer);
