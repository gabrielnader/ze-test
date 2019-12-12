import React, { Component } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './css/style.css';

require('dotenv').config();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <MainContent></MainContent>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
