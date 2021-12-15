import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: {},
      dogName: '',
      arrayDogsName: [],
    };
  }

  fetchdog = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(results => { 
      this.setState({
        dogs: results,
      })
    })
  }
 
  componentDidMount() {
    if (localStorage.namedDogURL) {
      const parseStorage = JSON.parse(localStorage.namedDogURL);
      const lastDog = parseStorage[parseStorage.length - 1].message;
      this.setState({
        arrayDogsName: parseStorage,
        dogs: { message: lastDog }
      });
    } else {
      this.fetchdog();
    }
  }

  shouldComponentUpdate = (actualProps, nextState) => {
    if (nextState.dogs.message.includes('terrier')) {
      return false 
      } 
      return true
   }

   componentDidUpdate = ()  => {
    localStorage.setItem('lastSavedDog', this.state.dogs.message)
    const dogBreed = this.state.dogs.message.split('/')[4]
    // alert(dogBreed)
    return true
  }

   saveDogName = () =>{
    const { dogs: {message}, dogName, arrayDogsName } = this.state;
    const dogData = {message, dogName }
    const arrayUrleNames = [...arrayDogsName, dogData]
    this.setState ({arrayDogsName:  arrayUrleNames});
    this.setState ({dogName: '' }) 
    localStorage.setItem("namedDogURL", JSON.stringify(arrayUrleNames));
  }

  render() {
    const { dogs } = this.state;

    return (
      !dogs ? 'LOADING...' :   
        <div>
        <h1> Dogs </h1>
        <input 
          name='dogName'
          type='text'
          value={this.dogName}
          placeholder = 'nomeie este dog'
          onChange = {({target})=> {
            this.setState({
              dogName: {[target.name]: target.value}
            })
          }}
        />
        <button
          onClick = {this.saveDogName}
        > Salvar Nome do Dog
        </button>
        <button
          type='button'
          onClick={this.fetchdog}
        > Próximo dog
        </button>
      <div>
        <img className='img'
          src={dogs.message}
          alt='misterious dog'
        >
      </img>
      </div>
      </div>
    );
  }
}

export default App;
