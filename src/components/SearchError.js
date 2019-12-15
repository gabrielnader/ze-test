import React, { Component } from 'react';
import styled from 'styled-components';
import notFound from '../img/welcome-glass.png';

const Error = styled.div`
  width: 100%;
  margin-top: 42px;
  margin-bottom: 62px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NotFoundImg = styled.img.attrs(props => ({
  src: props.src,
  alt: props.alt
}))`
  width: 300px;
`

class SearchError extends Component {
  render() {
    return (
      <Error>
        {this.props.error}
        <NotFoundImg src={notFound} alt="Endereço não encontrado"/>
      </Error>
    );
  }
}

export default SearchError;