import React, { Component } from "react";
import Title from "./components/Title/Title";
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
    console.log(this.state.decks);
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
      <div>
        <Title testPro={this.state.decks} />
      </div>
    );
  }
}

export default App;
