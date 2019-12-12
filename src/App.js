import React, { Component } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './css/style.css';

import { ApolloProvider } from 'react-apollo';

import apolloClient from './services/apollo';

require('dotenv').config();

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <div className="App">
          <Header></Header>
          <MainContent></MainContent>
          <Footer></Footer>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
