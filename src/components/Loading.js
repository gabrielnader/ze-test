import React, { Component } from 'react';
import loadingImage from '../img/loading-beer.gif';
import styled from 'styled-components';

const LoadingImg = styled.img.attrs(props => ({
  src: props.src,
  alt: props.alt
}))`
  width: 100%;
`

class Loading extends Component{
  render(){
    return (
      <div>
        <LoadingImg src={loadingImage} alt="Carregando produtos" ></LoadingImg>
      </div>
    );
  }
}

export default Loading;