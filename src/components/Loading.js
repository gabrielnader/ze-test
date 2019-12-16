import React, { Component } from 'react';
import loadingImage from '../img/loading-beer.gif';
import styled from 'styled-components';

const LoadingImg = styled.img.attrs(props => ({
  src: props.src,
  alt: props.alt
}))`
  width: 100%;
  max-width: 1024px;
`

const LoadingContent = styled.div`
  text-align: center;
  background: white;
`

class Loading extends Component{
  render(){
    return (
      <LoadingContent>
        <LoadingImg src={loadingImage} alt="Carregando produtos" ></LoadingImg>
      </LoadingContent>
    );
  }
}

export default Loading;