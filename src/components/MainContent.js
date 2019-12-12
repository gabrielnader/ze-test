import React, { Component } from 'react';
import SearchForm from './SearchForm';
import Loading from './Loading';
import SearchError from './SearchError';

class MainContent extends Component{
  constructor() {
    super();
    this.sendAddress = this.sendAddress.bind(this);
    this.setAddress = this.setAddress.bind(this);

    this.state = {
      address: '',
      error: null,
      loading: false,
      items: null
    };
  }
  
  setAddress(event) {
    this.setState({ address: event.target.value });
  }

  sendAddress = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.address.split(' ').join('+') + "&key=" + process.env.REACT_APP_GOOGLE_KEY;
    // console.log(googleUrl)
    fetch(googleUrl)
      // API GOOGLE
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          if(result.status === "ZERO_RESULTS"){
            this.setState({
              loading: false,
              error: "Endereço não encontrado"
            })
            return
          }
          console.log(result.results[0].geometry.location.lat, result.results[0].geometry.location.lng);
          fetch("http://cdc-react.herokuapp.com/api/autores")
            // API POC
            .then(res => res.json())
            .then(
              (result) => {
                const pocMocado = {
                  "data": {
                    "pocSearch": [
                      {
                        "__typename": "POC",
                        "id": "532",
                        "status": "AVAILABLE",
                        "tradingName": "Distribuidor de Treinamento",
                        "officialName": "Distribuidor de Treinamento"
                      }
                    ]
                  }
                }
                console.log(pocMocado.data.pocSearch[0].id, pocMocado.data.pocSearch[0].status);
                fetch("products.json")
                  // API Products
                  .then(res => res.json())
                  .then(
                    (result) => {
                      this.setState({
                        loading: false,
                        items: result
                      });
                    }
                  )
              },
              (error) => {
                this.setState({
                  loading: false,
                  error
                });
              })
        },
        (error) => {
          this.setState({
            loading: false,
            error
          });
        }
      )
  }
  
  render(){
    if (this.state.loading) {
      return (
        <Loading></Loading>
      );
    }

    if (this.state.items) {
      const items = this.state.items.data.poc.products.map(function (product) {
        return <div>{product.title}</div>
      })

      return (
        <div>{items}</div>
        );
    }

    if(this.state.error){
      return(
        <SearchError error={this.state.error}></SearchError>
      )
    }

    return(
      <SearchForm address={this.state.address} onSubmit={this.sendAddress} onChange={this.setAddress} ></SearchForm>
    );
  }
}

export default MainContent;