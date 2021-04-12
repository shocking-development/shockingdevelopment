import React from 'react';
import { Container, Table, Header, Loader, Image, Pagination } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserInfos } from '../../../api/userInfo/UserInfoCollection';
import ProfileItemAdmin from '../../components/profile/ProfileItemAdmin';
import NavBarMain from '../../components/main-navbar/NavBarMain';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListProfileAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handleInputChange = (e, data) => {
    this.setState({ activePage: Number(data.activePage),
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <div
        className={'loaderStyle'}>
      <Loader active inverted> Getting data</Loader>
    </div>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const pageStyle = {
      background: '#001947',
      minHeight: '110vh',
      backgroundSize: 'cover',
    };

    const startIndex = (this.state.activePage * 25 - 25);
    const endIndex = (this.state.activePage * 25);

    return (
        <div style={pageStyle}>
          <NavBarMain/>
          <Container style={{
            textAlign: 'center',
            background: '#001947',
            minHeight: '110vh',
            Width: '100%',
            paddingLeft: '15em',
            paddingTop: '8em',
            paddingBottom: '8em',
          }}>
            <Header as="h2" textAlign="center" inverted>List Profiles (Admin)</Header>
            <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
              paddingBottom: '50px',
            }}/>

            <Pagination
                defaultActivePage={1}
                totalPages={Math.ceil(this.props.profiles.length / 25)}
                onPageChange={this.handleInputChange}
                />
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Username/Email</Table.HeaderCell>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Personal Transportation</Table.HeaderCell>
                  <Table.HeaderCell>Zipcode</Table.HeaderCell>
                  <Table.HeaderCell>Owner</Table.HeaderCell>
                  <Table.HeaderCell>Remove</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.profiles.map((profile) => <ProfileItemAdmin key={profile._id} profile={profile}/>).slice(startIndex, endIndex)}
              </Table.Body>
            </Table>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListProfileAdmin.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = UserInfos.subscribeUserInfoAdmin();
  return {
    profiles: UserInfos.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListProfileAdmin);
