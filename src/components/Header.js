import React, { Component } from 'react';
import Logo from '../img/logo.png';

class Header extends Component{
  render(){
    return (
      <img src={Logo} alt="logo" width="200"/>
    );
  }
}

export default Header;