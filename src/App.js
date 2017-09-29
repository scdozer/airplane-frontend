import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      planes: [],
      planetype: [],
      passengercount: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3000/api/planes')
    .then(response => {
      this.setState({planes: response.data})
    })
  }


  addPlane = () => {
    const { planetype, passengercount } = this.state;


    axios.post('http://localhost:3000/api/planes', {
      planetype,
      passengercount: Number(passengercount)
    }).then((response) =>{
      this.setState({planes: response.data})
    })
    {/*
    is the same as
    axios.post('http://localhost:3000/api/planes'), {
      planetype: this.state.planetype,
      passengercount: this.state.passengercount
    }*/}
  }


  render() {
    return (
      <div className="App">

      <input onChange = {(e) => this.setState({planetype: e.target.value})} placeholder="planetype" />
      <input onChange = {(e) => this.setState({passengercount: e.target.value})} placeholder="passengercount" />
      <button onClick= { this.addPlane }>Add Plane</button>


        {this.state.planes.map((plane =>{
          return (
              <div key={plane.planeid}>TYPE: {plane.planetype} PASSENGERS: {plane.passengercount}</div>
          )
        }))}
      </div>
    );
  }
}

export default App;
