import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Icon, Loader, IconGroup } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { UserInfos } from '../../../api/userInfo/UserInfoCollection';

/**
 * The NavBarMain appears at the top of every loged-in page. Rendered in pages such as Home, EditProfile, ...
 * @memberOf ui/components/main-navbar
 */
class NavBarMain extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() :
        <Loader active inverted/>;
  }

  renderPage() {
    /* Some styling components */
    const navbarVerticle = {
      height: '100%', /* Full-height: remove this if you want "auto" height */
      width: 'auto', /* Set the width of the sidebar */
      position: 'fixed', /* Fixed Sidebar (stay in place on scroll) */
      zIndex: '1', /* Stay on top */
      top: '0', /* Stay at the top */
      left: '0',
      overflowX: 'hidden', /* Disable horizontal scroll */
      paddingTop: '20px',
    };

    const userstyling = {
      textAlign: 'center',
      fontSize: 'large',
      fontWeight: 'lighter',
    };

    return (

        <div className={'css-selector'} style={navbarVerticle}>
          {this.props.currentUser ? (

              [<Menu inverted pointing secondary vertical style={{ borderWidth: '0', fontFamily: 'sans-serif' }}
                     key='key0'>
                <Menu.Item as={NavLink} activeClassName="" exact to="/profile">
                  <Image size='medium' circular src={this.props.profiles?.userImage}
                      // eslint-disable-next-line
                         onError={(i) => i.target.src = '/images/default_image.jpg'}/>
                </Menu.Item>
                <Menu.Item style={userstyling}> Hello, {this.props.profiles?.firstName}! </Menu.Item>

                <Menu.Item className='spacing-menu-item' as={NavLink} activeClassName="active" exact to="/profile"
                           key='key1' id='user-profile'>
                  <Icon name='user' size='large'/>
                  View Profile
                </Menu.Item>

                <Menu.Item className='spacing-menu-item' as={NavLink} activeClassName="active" exact to="/home"
                           key='key2'>
                  <Icon name='home' size='large'/>
                  Home
                </Menu.Item>

                <Menu.Item className='spacing-menu-item2' as={NavLink} activeClassName="active" exact to="/add"
                           key='key3'>
                  <Icon name='cloud' size='large'/>
                  Add Today&apos;s Emissions
                </Menu.Item>

                <Menu.Item className='spacing-menu-item'>
                  <Icon name='calculator' size='large'/>
                  <Dropdown className='spacing-menu-item' text="GHG Calculator" pointing="bottom">
                    <Dropdown.Menu>
                      <Dropdown.Item className='spacing-menu-item' as={NavLink} activeClassName="active" exact to="/ghgCalMetric"
                                     key='key8'
                                     id="calculator-metric">
                        Metric
                      </Dropdown.Item>
                      <Dropdown.Item className='spacing-menu-item' as={NavLink} activeClassName="active" exact to="/ghgCal"
                                     key='key4' id="calculator-imperial">
                        US
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                </Menu.Item>

                {/* <Menu.Item as={NavLink} activeClassName="active" exact to="/notfound" key='key5'>
                  <Icon name='map' size='large'/>
                  Map your route
                </Menu.Item> */}

                <Menu.Item className='spacing-menu-item' as={NavLink} activeClassName="active" exact to="/gotosavings"
                           key='key6'>
                  <Icon name='money bill alternate' size='large'/>
                  Go to savings
                </Menu.Item>

                <Menu.Item className='spacing-menu-item' as={NavLink} activeClassName="active" exact to="/cars"
                           key='key10'>
                  <Icon name='car' size='large'/>
                  Cars
                </Menu.Item>

                <Menu.Item className='spacing-menu-item' as={NavLink} activeClassName="active" exact to="/request"
                           key='key13'>
                  <Icon name = 'pen square icon' size='large'/>
                  Make a Request
                </Menu.Item>

                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                    <Menu.Item className='spacing-menu-item' as={NavLink} activeClassName="active" exact to="/admin"
                               key='admin'>Admin

                      <IconGroup style={{ float: 'right' }} size={'large'}>
                        <Icon name='user'/>
                        <Icon corner style={{ color: 'rgb(169,169,169)' }} name='setting'/>
                      </IconGroup>

                    </Menu.Item>
                ) : ''}

                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Menu.Item as={NavLink} activeClassName="active" exact to="/listcars" key='key11'>
                  <IconGroup style={{ float: 'right' }} size={'large'}>
                    <Icon name='list alternate outline'/>
                    <Icon corner style={{ color: 'rgb(169,169,169)' }} name='car'/>
                  </IconGroup>
                  List Cars (Admin)
                </Menu.Item>
                ) : ''}

                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                    <Menu.Item as={NavLink} activeClassName="active" exact to="/cumulativedata" key='key12'>
                      <IconGroup style={{ float: 'right' }} size={'large'}>
                        <Icon name='line graph'/>
                      </IconGroup>
                      Cumulative Data
                    </Menu.Item>
                ) : ''}

                <Menu.Item className='spacing-menu-item' as={NavLink} activeClassName="active" exact to="/signout"
                           key='key7'>
                  <Icon name='sign-out' size='large'/>
                  Sign Out
                </Menu.Item>

              </Menu>,
              ]
          ) : ''}

        </div>

    );
  }
}

/** Declare the types of all properties. */
NavBarMain.propTypes = {
  profiles: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
  currentId: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBar2Container = withTracker(() => {
  const userID = Meteor.userId();
  const subscription = UserInfos.subscribeUserInfo();
  const userAccount = Meteor.users.findOne({ _id: userID });
  let profiles;
  if (userAccount) {
    profiles = UserInfos.findOne({ owner: userAccount?.username });
  }
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const currentId = Meteor.userId();
  const ready = subscription.ready();

  return {
    profiles,
    currentUser,
    currentId,
    ready,
  };
})(NavBarMain);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBar2Container);
