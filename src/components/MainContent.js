import React, { Component } from 'react';
import SearchForm from './SearchForm';
import Loading from './Loading';
import SearchError from './SearchError';

import httpLink from '../services/apollo';
import gql from 'graphql-tag';

class MainContent extends Component {
  constructor() {
    super();
    this.getLatLong = this.getLatLong.bind(this);
    this.setAddress = this.setAddress.bind(this);

    this.state = {
      address: 'Rua Américo Brasiliense, São Paulo',
      error: null,
      loading: false,
      items: null,
      categories: '',
      pocId: '',
      pocStatus: ''
    };
  }

  setAddress(event) {
    this.setState({ address: event.target.value });
  }

  tryAgain = (event) => {
    event.preventDefault();
    this.setState({
      address: 'Rua Américo Brasiliense, São Paulo',
      error: null,
      loading: false,
      items: null,
      categories: '',
      pocId: '',
      pocStatus: ''
    })
  }

  fillProducts = (pocId, pocStatus, categoryId=null) => {
    const productsQuery = gql`
                query poc($id: ID!, $categoryId: Int, $search: String){
                  poc(id: $id) {
                    products(categoryId: $categoryId, search: $search) {
                      title
                      id
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

    if (pocStatus !== 'AVAILABLE') {
      this.setState({
        loading: false,
        error: "Sem estoque para este endereço atualmente. Tente novamente mais tarde."
      })
      return
    }

    httpLink.query({
      query: productsQuery,
      variables: { id: pocId, search: '', categoryId: categoryId }
    }).then(result => {
      this.setState({
        loading: false,
        items: result
      })

      const categoryQuery = gql`
                  query allCategoriesSearch {
                    allCategory{
                      title
                      id
                    }
                  }
                `;
      httpLink.query({
        query: categoryQuery
      }).then(result => {
        this.setState({
          categories: result.data.allCategory
        })
      })
    })
  }

  getPocId = (googleResult) => {
    const lat = googleResult.results[0].geometry.location.lat;
    const long = googleResult.results[0].geometry.location.lng;
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
        if (result.data.pocSearch.length === 0) {
          this.setState({
            loading: false,
            error: "Endereço não encontrado"
          })
          return
        }

        const pocId = result.data.pocSearch[0].id;
        const pocStatus = result.data.pocSearch[0].status;

        this.fillProducts(pocId, pocStatus);
      })
  }

  getLatLong = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const address = this.state.address.split(' ').join('+');
    const googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + process.env.REACT_APP_GOOGLE_KEY;

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

          this.getPocId(result)
        },
        (error) => {
          this.setState({
            loading: false,
            error: "Tente novamente"
          });
        }
      );
  }


  render() {
    if (this.state.loading) {
      return (
        <Loading></Loading>
      );
    }

    if (this.state.items && this.state.categories) {
      const items = this.state.items.data.poc.products.map(function (product) {
        return (
          <li key={product.id} style={{ listStyle: 'none', width: '120px' }}>
            <img src={product.images[0].url} alt={product.title} width="50" />
            <hr />
            <p>{product.title}</p>
            <label>R${product.productVariants[0].price}</label>
          </li>
        )
      })

      const categories = this.state.categories.map(function (category) {
        return (
          <option key={category.id}>{category.title}</option>
        )
      })

      return (
        <div>
          <div>
            <select onChange={this.fillProducts} >
              <option disabled>Selecione uma categoria</option>
              {categories}
            </select>
          </div>
          {items}
        </div>
      );
    }

    if (this.state.error) {
      return (
        <div>
          <a href="/" onClick={this.tryAgain}>Voltar</a>
          <SearchError error={this.state.error}></SearchError>
        </div>
      )
    }

    return (
      <SearchForm address={this.state.address} onSubmit={this.getLatLong} onChange={this.setAddress} ></SearchForm>
    );
  }
}

export default MainContent;