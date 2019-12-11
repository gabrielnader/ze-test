import React, { Component } from 'react';
import './css/style.css';

class App extends Component {

  constructor() {
    super();
    this.sendAddress = this.sendAddress.bind(this);
    this.setAddress = this.setAddress.bind(this);
    
    this.state = {
      address:''
      // error: null,
      // isLoaded: false,
      // items: []
    };
    
  }

  setAddress(evento) {
    this.setState({ address: evento.target.value });
    console.log(this.state.address)
  }

  sendAddress = (event) => {
    event.preventDefault();
    console.log(this.state.address);
    // fetch("http//localhost:8080/api/autores")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       this.setState({
    //         isLoaded: true,
    //         items: result.items
    //       });
    //     },
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });

    //     }
    //   )
  }

  render() {
    // console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          Header
      </header>

        <main>
          <form onSubmit={this.sendAddress} method="post">
            <input type="text" value={this.state.address} onChange={this.setAddress} />
            <input type="submit" value="OK"/>
          </form>
        </main>

        <footer>
          copyright@2019
      </footer>
      </div>
    );
  }
}


export default App;
