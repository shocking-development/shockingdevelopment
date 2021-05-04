import React from 'react';
import { Header, Grid, Button, Icon, Pagination } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { UserInfosCars } from '../../../api/userInfo/UserInfoCarCollection';
import CarCardItem from '../../components/cars/CarCardItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class RecentlyAddedCars extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() :
        <div style={{ background: 'transparent' }}>
        </div>;
  }

  /** Initializes a constructor */
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  /** Updates the controls everytime a button is pressed */
  handleInputChange = (e, data) => {
    this.setState({
      activePage: Number(data.activePage),
    });
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    /** Constant variable to start at index 0 */
    const startIndex = (this.state.activePage * 1 - 1);

    /** Variable that holds the index of the last item */
    const endIndex = (this.state.activePage * 1);

    return (
        <div>
          <Header inverted as="h1" textAlign="center"
                  style={{ fontWeight: 'lighter', paddingTop: '65px', paddingBottom: '45px' }}
                  className={'YourCarsHeader'}>
            Your Cars
          </Header>
          {this.props.cars.length !== 0 ?
              <div>
                <Grid className={'RecentlyAddedCarsGrid'}>
                  {this.props.cars.map((car) => <CarCardItem key={car._id} car={car}/>).slice(startIndex, endIndex)}
                  <Grid.Column className={'addCarBtn'}>
                    {/** Implementation of Pagination: functionality */}
                    <Pagination
                        defaultActivePage={1}
                        totalPages={Math.ceil(this.props.cars.length / 1)}
                        onPageChange={this.handleInputChange}
                        style={{ position: 'absolute', left: '-223px', bottom: '23.5em' }}
                        pointing
                        secondary
                        className={'paginationForUSERCARS'}
                    />
                    <Button
                        as={NavLink}
                        exact to={'/cars'}
                        animated='vertical'
                        size='medium'
                        color='blue'
                        style={{ top: '310px', left: '-124px' }}
                        id='edit-password'
                        className={'editButtonProfile'}
                    >
                      <Button.Content hidden>Add Car</Button.Content>
                      <Button.Content visible>
                        <Icon name='add'/>
                      </Button.Content>
                    </Button>
                  </Grid.Column>
                </Grid>
              </div> :
              <Header
                  className={'RecentlyAddedCarsHeader'}
                  inverted as="h2"
                  textAlign="center">
                No cars have been added. <a
                  style={{ color: 'rgb(7 182 254)' }} href={'#/cars'}>
                You can add cars here.
              </a>
              </Header>}
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
RecentlyAddedCars.propTypes = {
  cars: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = UserInfosCars.subscribeUserInfoCars();
  return {
    cars: UserInfosCars.find({}).fetch(),
    ready: subscription.ready(),
  };
})(RecentlyAddedCars);
