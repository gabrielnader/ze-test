import React, { Component } from 'react';
import styled from 'styled-components';

const FooterElement = styled.footer`
  width: 100%;
  border-top: 1px solid gray;
`
const CopyStyled = styled.p`
  margin: 0;
  text-align: center;
  font-size: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
`

class Footer extends Component{  
  render(){
    return (
      <FooterElement>
        <CopyStyled>© 2019 Zé Delivery - Todos os direitos reservados.</CopyStyled>
      </FooterElement>
    );
  }
}

export default Footer;