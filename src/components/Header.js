import React, { Component } from 'react';
import Logo from '../img/logo.png';
import styled from 'styled-components';

const LogoElement = styled.img.attrs(props => ({
  src: props.imageSource,
  alt: props.imageAlt
}))`
  width: 175px;
  margin: 16px;
  @media (min-width:1024px){
    margin: 36px;
  }
`

class Header extends Component{
  render(){
    return (
      <header>
        <LogoElement imageSource={Logo} imageAlt="logo" />
      </header>
    );
  }
}

export default Header;