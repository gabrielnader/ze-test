import React, { Component } from 'react';
import styled from 'styled-components';
import howImg1 from '../img/how_it_works_01.png';
import howImg2 from '../img/how_it_works_02.png';
import howImg3 from '../img/how_it_works_03.png';
import welcome from '../img/maluma_baixo_desktop.png';

const SectionCustom = styled.section`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: 12px;
  `;
const HowContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media (min-width: 760px){
    flex-direction: row;
  }
`

const ImgStyle = styled.img.attrs(props => ({
  src: props.imageSource,
  alt: props.imageAlt,
  width: props.imageWidth
}))`
  margin: 32px 4px 4px;
`

const ItemStyled = styled.div`
  text-align: center;
  width: 250px;
`
const Subtitled = styled.h6`
  font-size: 16px;
  margin: 0 0 8px;
`
class HowItWorks extends Component {
  render() {
    
    return (
      <SectionCustom>
        <h2>Como funciona o Zé Delivery?</h2>
        <HowContent>
          <ItemStyled>
            <ImgStyle imageSource={howImg1} imageAlt="Onde você estiver" imageWidth="112"/>
            <Subtitled>Onde você estiver</Subtitled>
            <span>Achamos as bebidas geladinhas na sua área e levamos até você!</span>
          </ItemStyled>
          <ItemStyled>
            <ImgStyle imageSource={howImg2} imageAlt="Só as favoritas" imageWidth="112"/>
            <Subtitled>Só as favoritas</Subtitled>
            <span>Você pode escolher suas bebidas preferidas, salgadinhos e até gelo</span>
          </ItemStyled>
          <ItemStyled>
            <ImgStyle imageSource={howImg3} imageAlt="Facilita seu brinde" imageWidth="112"/>
            <Subtitled>Facilita seu brinde</Subtitled>
            <span>Suas bebidas chegam geladinhas e super rápidas, prontas para brindar!</span>
          </ItemStyled>
        </HowContent>
        <ImgStyle imageSource={welcome} imageAlt="App no celular com cerveja em volta" imageWidth="100%"></ImgStyle>
      </SectionCustom>
    );
  }
}

export default HowItWorks;