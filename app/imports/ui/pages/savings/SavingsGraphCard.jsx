import React from 'react';
import { Button, Card, Image, Header,  Dropdown, Icon, Table  } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarMain from '../../components/main-navbar/NavBarMain';
import { GraphOptions } from '../../components/defaultcharts/SavingsPageBarGraph';
import { UserInfosCars } from '../../../api/userInfo/UserInfoCarCollection';
import { Cars } from '../../../api/cars/CarsCollection';

export function SaveingsGraphCard(name, description, info, icon, data1, data2) {

  // In page styling for the graphs.
  const dataPageBarGraphstyling = {
    background: 'transparent',
    borderRadius: '5px',
    paddingTop: '5px',
    paddingRight: '5px',
    color: 'black',
  };

  // In page styling for within the display cards
  const inCardStyle = {
    textSize: 50,
  };

  return (

          <Card style={{ background: 'rgba(0, 73, 122, 0.5)', boxShadow: 'none' }}>
            <Card.Content>
              <div align="right"><Icon inverted name={icon}/></div>
              <Card.Header className={'CarcardFont'}>{name}</Card.Header>
              <Card.Meta className={'CarcardFont'}>{description}</Card.Meta>
              <Card.Description className={'CarcardFont'}>{info}</Card.Description>
            </Card.Content>
            <Card.Content>
              <div style={dataPageBarGraphstyling}>
                {GraphOptions(data1, data2)}
              </div>
            </Card.Content>
            <Card.Content extra color='teal'>
              <div className='ui three buttons'>
                <Button color='teal'>Input Usage</Button>
                <Button color='teal' as={NavLink} exact to="/notfound">Input Car</Button>
                <Button color='teal' as={NavLink} exact to="/notfound" style={inCardStyle}>See results</Button>

              </div>
            </Card.Content>
          </Card>

  );

}

export default withTracker(() => {
  // Get access to Cars documents.
  const subscription = Cars.subscribeCars();
  return {
    ready: subscription.ready(),
  };
})(SaveingsGraphCard);
