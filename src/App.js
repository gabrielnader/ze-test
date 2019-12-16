import React, { Component } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './css/style.css';
import styled from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './services/apollo';

const AppContent = styled.div`
  font-family: sans-serif;
  height: 100%;
  scroll-behavior: smooth;
  background: rgb(250, 250, 250);
  margin: 0 auto;
  overflow-x: hidden;
  box-sizing: border-box;
`

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <AppContent>
          <Header></Header>
          <main>
            <MainContent></MainContent>
          </main>
          <Footer></Footer>
        </AppContent>
      </ApolloProvider>
    );
  }
}

export default App;
