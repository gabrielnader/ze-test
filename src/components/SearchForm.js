import React, { Component } from 'react';
import HowItWorks from './HowItWorks';
import styled from 'styled-components';
import welcomeImg2 from '../img/welcome-glass.png';

const SectionStyled = styled.section`
  margin: 16px;
  position: relative;
  max-width: 1024px;
  @media (min-width:1024px){
    margin: 16px auto
  }
`
const Title = styled.h1`
  font-weight: bold;
  fontsize: 40px;
  color: #333;
  max-width: 300px;
`
const Subtitle = styled.h2`
  font-size: 20px;
  color: #333;
`
const FormLable = styled.h3`
  font-size: 12px;
  color: #333;
`
const Form = styled.form`
  border: 1px solid #333;
  padding: 8px;
  text-align: center;
  border-radius: 5px;
  background-color: #FFC500;
  width: 220px;
  margin: 0 auto;
  margin-top: 120px;
`

const Input = styled.input.attrs(props => ({
  type: props.type,
  value: props.address,
  onChange: props.onChange
}))`
    height: 36px;
    font-weight: lighter;
    box-sizing: border-box;
    color: rgb(51, 51, 51);
    background-color: rgb(255, 255, 255);
    font-size: 16px;
    line-height: 20px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(204, 204, 204);
`
const Button = styled.input.attrs(props => ({
  type: props.type,
  value: props.value
}))`
    font-size: 14px;
    line-height: 18px;
    text-transform: uppercase;
    margin-left: auto;
    margin-right: auto;
    color: rgb(0, 0, 0);
    width: 100%;
    outline: none;
    border-radius: 24px;
    padding: 8px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(255, 197, 0);
    margin-top: 4px;
    width: 100px;
`

const ImgStyled = styled.img.attrs(props => ({
  src: props.src,
  alt: props.alt,
  width: props.width
}))`
    margin: 0;
    position: absolute;
    right: 0px;
    top: 0px;
    display: none;

    @media (min-width:740px){
      display: block;
    }
`

class SearchForm extends Component {
  render() {
    return (
      <SectionStyled>
        <Title>Seu delivery de bebidas geladas a preço baixo</Title>
        <Subtitle>Para curtir a qualquer momento</Subtitle>
        <ImgStyled src={welcomeImg2} alt="" width="300" />
        <Form onSubmit={this.props.onSubmit} method="post">
          <FormLable>VER PRODUTOS PARA MEU ENDEREÇO</FormLable>
          <Input type="text" address={this.props.address} onChange={this.props.onChange} />
          <Button type="submit" value="OK" />
        </Form>
        <HowItWorks></HowItWorks>
      </SectionStyled>
    );
  }
}

export default SearchForm;