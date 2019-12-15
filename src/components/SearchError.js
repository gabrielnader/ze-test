import React, { Component } from 'react';

class SearchError extends Component {
  render() {
    return (
      <div>
        {this.props.error}
      </div>
    );
  }
}

export default SearchError;