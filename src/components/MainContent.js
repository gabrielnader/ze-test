import React, { Component } from 'react';
import SearchForm from './SearchForm';
import Loading from './Loading';
import SearchError from './SearchError';

import httpLink from '../services/apollo';
// import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class MainContent extends Component {
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
    fetch(googleUrl)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.status === "ZERO_RESULTS") {
            this.setState({
              loading: false,
              error: "Endereço não encontrado"
            })
            return
          }

          let lat = result.results[0].geometry.location.lat;
          let long = result.results[0].geometry.location.lng;
          const now = new Date();
          const algorithm = 'NEAREST';
          const pocQuery = gql`
            query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
              pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
                id
                status
              }
            }`;

          httpLink.query({
            query: pocQuery,
            variables: { now: now, algorithm: algorithm, lat: lat, long: long }
          })
            .then(result => {
              const pocId = result.data.pocSearch[0].id;
              const pocStatus = result.data.pocSearch[0].status;

              if (pocStatus !== 'AVAILABLE') {
                return
              }

              const productsQuery = gql`
                query poc($id: ID!, $categoryId: Int, $search: String){
                  poc(id: $id) {
                    products(categoryId: $categoryId, search: $search) {
                      title
                      images {
                        url
                      }
                      productVariants {
                        price
                        subtitle
                      }
                    }
                  }
                }`;

              httpLink.query({
                query: productsQuery,
                variables: { id: pocId, search: '', categoryId: null }
              }).then(result => {
                console.log(result);
              })
          },
        (error) => {
          this.setState({
            loading: false,
            error
          });
        }
      );
  })}


  render() {
    if (this.state.loading) {
      return (
        <Loading></Loading>
      );
    }

    if (this.state.items) {
      const items = this.state.items.data.poc.products.map(function (product) {
        return <div key={product.id}>{product.title}</div>
      })

      return (
        <div>{items}</div>
      );
    }

    if (this.state.error) {
      return (
        <SearchError error={this.state.error}></SearchError>
      )
    }

    return (
      <SearchForm address={this.state.address} onSubmit={this.sendAddress} onChange={this.setAddress} ></SearchForm>
    );
  }
}

export default MainContent;