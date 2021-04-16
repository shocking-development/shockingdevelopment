import React from 'react';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

export class Search extends React.Component {
  state = { isSearch: false, search: '' };

  search;

  constructor(props) {
    super(props);
    this.state = { isSearch: false, search: '' };
    this.search = '';

  }

  lookFor() {

    if (this.search.value !== '') {
      // eslint-disable-next-line react/prop-types
      this.props.sendSearch(this.search.value);
    }

  }

  render() {

    return (
        <div>
          <input style={{ marginLeft: `${20}px`, height: `${40}px`, width: `${200}px`,
            borderRadius: `${10}px`, outline: 'none' }}
              // eslint-disable-next-line no-return-assign
                 type="search" ref={input => this.search = input} placeholder="Search by First Name" required />

          <Button style={{ marginRight: '20px', backgroundColor: 'black', color: 'white' }}
                  onClick={() => this.lookFor()}>Search</Button>

        </div>
    );
  }
}

export default withRouter(Search);
