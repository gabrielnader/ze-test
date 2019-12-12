import React, { Component } from 'react';

class SearchForm extends Component{
  render(){
    return (
      <form onSubmit={this.props.onSubmit} method="post">
        <input type="text" value={this.props.address} onChange={this.props.onChange} />
        <input type="submit" value="OK" />
      </form>
    );
  }
}

export default SearchForm;