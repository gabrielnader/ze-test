import React, { Component } from 'react';
import styled from 'styled-components';

const AddToCartContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
`;
const Button = styled.button.attrs(props => ({
  onClick: props.onClick
}))`
  border-radius: 24px;
  margin: 4px;
  box-sizing: border-box;
  background: #ffc500;
  :focus {
    outline: none;
  }
`;
const Label = styled.label.attrs(props => ({
  id: props.id
}))`
  font-size: 12px;
`;

class AddToCart extends Component { 
  constructor(){
    super();
    this.addItem = this.addItem.bind(this);
    this.decreaseItem = this.decreaseItem.bind(this);
    this.addToCart = this.addToCart.bind(this);
    
    this.state = {
      numberOfItems: 0
    }
  } 

  decreaseItem() {
    let prevState = this.state.numberOfItems;
    if (prevState === 0){
      return
    }
    this.setState({
      numberOfItems: prevState - 1
    });
  }
  
  addItem() {
    let prevState = this.state.numberOfItems;
    this.setState({ 
      numberOfItems: prevState + 1 
    });
  }

  addToCart() {
    this.setState({
      numberOfItems: 0
    })
  }

  render() {
    return (
      <AddToCartContent>
        <Button onClick={this.decreaseItem}>-</Button>
        <Label>{this.state.numberOfItems}</Label>
        <Button onClick={this.addItem}>+</Button>
        <Button onClick={this.addToCart}>Adicionar</Button>
      </AddToCartContent>
    );
  }
}

export default AddToCart;