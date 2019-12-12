import React, { Component } from 'react';
import './css/style.css';

class App extends Component {

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
    console.log(googleUrl)
    fetch(googleUrl)
      // API GOOGLE
      .then(res => res.json())
      .then(
        (result) => {
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

  render() {
    if (this.state.loading) {
      return (
        <div>Loading...</div>
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

    return (
      <div className="App">
        <form onSubmit={this.sendAddress} method="post">
          <input type="text" value={this.state.address} onChange={this.setAddress} />
          <input type="submit" value="OK" />
        </form>
      </div>
    );
  }
}

export default App;
