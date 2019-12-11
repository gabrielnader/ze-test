import React, { Component } from 'react';
import './css/style.css';

class App extends Component {

  sendAddress = () => {
    console.log('enviou');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Header
      </header>

        <main>
          <input type="text" name="address" id="address-input" />
          <input type="button" value="OK" onClick={this.sendAddress.bind(this)}/>
        </main>

        <footer>
          copyright@2019
      </footer>
      </div>
    );
  }
}


export default App;
