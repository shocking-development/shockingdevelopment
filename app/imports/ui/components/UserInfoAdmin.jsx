import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { UserInfo } from '../../api/userInfo/userInfo';

class UserInfoAdmin extends React.Component {
  removeUser(docID) {
    UserInfo.remove(docID);
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header> {this.props.userinfo.firstName} {this.props.userinfo.lastName}</Card.Header>
          <Card.Meta>
          ZipCode: {this.props.userinfo.zipcode} <br/>
          Transportation: {this.props.userinfo.transportation}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Button as={NavLink} exact to='/admin' floated='right'
                  onClick={() => this.removeUser(this.props.userinfo._id)} color='red'>
            Delete
          </Button>
        </Card.Content>
      </Card>
    );
  }
}
/** Require a document to be passed to this component* */
UserInfoAdmin.propTypes = {
  userinfo: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserInfoAdmin);
