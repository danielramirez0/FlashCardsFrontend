import React, { Component } from "react";
import Title from "./components/Title/Title";
import Decks from "./components/Decks/Decks";

const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainEndpoint: "http://localhost:5000/api/decks/",
      decks: "",
    };
  }

  componentDidMount() {
    this.getAllDecks(this.state.mainEndpoint);
  }

  async getAllDecks() {
    try {
      const response = await this.getDeckDataAPICall(this.state.mainEndpoint);
      this.setState({
        decks: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  getDeckDataAPICall(endpoint) {
    return new Promise((res, rej) => {
      const response = axios.get(endpoint);
      if (response != null) {
        res(response);
      } else {
        rej(new Error(`Unable to access data from ${endpoint} `));
      }
    });
  }

  render() {
    return (
      <div className="container justify-content-center">
        <Title />
        <Decks data={this.state.decks} />
      </div>
    );
  }
}

export default App;
