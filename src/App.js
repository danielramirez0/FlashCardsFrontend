import React, { Component } from "react";
import Title from "./components/Title/Title";
import Decks from "./components/Decks/Decks";
import NewDeck from "./components/NewDeck/NewDeck";

const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainEndpoint: "http://localhost:5000/api/decks/",
      decks: [],
    };
  }

  componentDidMount() {
    this.setAllDecks(this.state.mainEndpoint);
  }

  async setAllDecks() {
    try {
      const response = await this.getAllDecks(this.state.mainEndpoint);
      this.setState({
        decks: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  getAllDecks(endpoint) {
    return new Promise((res, rej) => {
      const response = axios.get(endpoint);
      if (response != null) {
        res(response);
      } else {
        rej(new Error(`Unable to access data from ${endpoint} `));
      }
    });
  }

  postNewDeck(endpoint, newDeck) {
    return new Promise((res, rej) => {
      const response = axios.post(endpoint, newDeck);
      if (response != null) {
        res(response);
      } else {
        rej(new Error(`Unable to add new deck at ${endpoint}`));
      }
    });
  }

  async setNewDeck(newDeck) {
    try {
      const response = await this.postNewDeck(this.state.mainEndpoint, newDeck);
      this.setState({
        decks: [...this.state.decks, response.data],
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="container justify-content-center">
        <Title />
        <Decks data={this.state.decks} />
        <NewDeck setNewDeck={(deck) => this.setNewDeck(deck)} />
      </div>
    );
  }
}

export default App;
