import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dogs: '',
    };
  }

  fetchdogs = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(results => {

      this.setState({
        dogs: results
      })
    })
  }

  componentDidMount() {
    this.fetchdogs();
  }

  render() {
    const { dogs } = this.state;
    
    if (dogs === '') {
      console.log('loading')
      return 'LOADING...'    
    }
    return (
      <div>
        <h1>
          Dogs
        </h1>
      <div>
        <img className='img'
          src={dogs.message}
          alt='misterious dog'
        >
      </img>
      </div>
        <button
          type='button'
          onClick={this.fetchdogs}
        >
          Próximo dog
        </button>
      </div>
    );
  }
}

export default App;
