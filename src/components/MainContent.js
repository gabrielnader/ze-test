import React, { Component } from 'react';
import SearchForm from './SearchForm';
import Loading from './Loading';
import SearchError from './SearchError';
import httpLink from '../services/apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const ProductsNav = styled.div`
  display: flex;
  margin: 16px;
  flex-direction: column;
  text-align: center;

  @media(min-width:360px){
    justify-content: space-around;
    flex-direction: row;
    text-align: left;
    align-items: center;
  }

  @media (min-width:692px){
    justify-content: space-between;
  }
`

const BackButton = styled.a.attrs(props => ({
  href: props.href,
  onClick: props.onClick
}))`
  color: black;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid gray;
  background: #ffc500;
  text-decoration: none;
  border-radius: 24px;
  margin-bottom: 24px;
  font-size: 14px;
  @media(min-width:360px){
    margin-bottom: 0;
  }
`

const Filter = styled.select`
  border-radius: 24px;
  background: white;
  padding: 6px;
  font-size: 14px;
  :focus{
    outline: none;
  }
`

const ListItem = styled.li.attrs(props => ({
  key: props.key
}))`
  width: 220px;
  text-align: center;
  display: flex;
  flex-direction: column;
  background: white;
  border: .5px solid lightgray;
  padding: 12px;
  box-sizing: border-box;
  margin-bottom: 24px;
  border-radius: 24px;
`

const ProductsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 36px;
  padding: 0 16px;
  justify-content: center;
  @media (min-width:472px){
    justify-content: space-around;
  }
  @media (min-width:692px){
    justify-content: space-between;
  }
  `

const ProductImage = styled.img.attrs(props => ({
  src: props.src,
  alt: props.alt
}))`
  width: 200px;
  height: auto;
`
const SeparateLine = styled.hr`
  width: 100%;
`
 
const ErrorContent = styled.div`
  margin: 16px;
`

class MainContent extends Component {
  constructor() {
    super();
    this.getLatLong = this.getLatLong.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

    this.state = {
      address: 'Rua Américo Brasiliense, São Paulo',
      error: null,
      loading: false,
      items: null,
      categories: '',
      pocId: '',
      pocStatus: '',
      value: 'choose'
    };
  }

  setAddress(event) {
    this.setState({ address: event.target.value });
  }

  handleSelectChange(event) {
    this.setState({ value: event.target.value });
    this.fillProducts(event);
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
      pocStatus: '',
      value: 'choose'
    })
  }

  fillProducts = (event) => {
    this.setState({
      loading: true,
    })

    let categoryId = null

    if (event) {
      categoryId = event.target.value;
    }

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

    if (this.state.pocStatus !== 'AVAILABLE') {
      this.setState({
        loading: false,
        error: "Putz, está fora da nossa área..."
      })
      return
    }

    httpLink.query({
      query: productsQuery,
      variables: { id: this.state.pocId, search: '', categoryId: categoryId }
    }).then(result => {
      this.setState({
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
          categories: result.data.allCategory,
          loading: false
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
            error: "Putz, está fora da nossa área..."
          })
          return
        }

        this.setState({
          pocId: result.data.pocSearch[0].id,
          pocStatus: result.data.pocSearch[0].status
        })

        this.fillProducts();
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
              error: "Putz, está fora da nossa área..."
            })
            return
          }

          this.getPocId(result)
        },
        (error) => {
          this.setState({
            loading: false,
            error: "Putz, está fora da nossa área..."
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
          <ListItem key={product.id}>
            <ProductImage src={product.images[0].url} alt={product.title} />
            <SeparateLine />
            <p>{product.title}</p>
            <label>R${product.productVariants[0].price}</label>
          </ListItem>
        )
      })

      const categories = this.state.categories.map(function (category) {
        return (
          <option key={category.id} value={category.id}>{category.title}</option>
        )
      })

      return (
        <div>
          <ProductsNav>
            <BackButton href="/" onClick={this.tryAgain}> &#8592; Mudar endereço</BackButton>
            <Filter value={this.state.value} onChange={this.handleSelectChange} >
              <option value='choose' disabled>Selecione uma categoria</option>
              {categories}
            </Filter>
          </ProductsNav>
          <ProductsList>
            {items}
          </ProductsList>
        </div>
      );
    }

    if (this.state.error) {
      return (
        <ErrorContent>
          <BackButton href="/" onClick={this.tryAgain}> &#8592; Voltar</BackButton>
          <SearchError error={this.state.error}></SearchError>
        </ErrorContent>
      )
    }

    return (
      <SearchForm address={this.state.address} onSubmit={this.getLatLong} onChange={this.setAddress} ></SearchForm>
    );
  }
}

export default MainContent;