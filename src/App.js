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
      showNewDeck: false,
      showCard: false,
      activeDeck: {},
      activeCard: 0,
      activeCards: [],
    };
  }

  componentDidMount() {
    this.setAllDecks(this.state.mainEndpoint);
  }

  toggleVisibility(component) {
    this.setState({
      [component]: !this.state[component],
    });
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

  deleteDeck(endpoint, deckID) {
    return new Promise((res, rej) => {
      const response = axios.delete(`${endpoint}/${deckID}`);
      if (response != null) {
        res(response);
      } else {
        rej(new Error(`Unable to delete deck at ${endpoint} with ID ${deckID}`));
      }
    });
  }

  async callDeleteDeck(deckID) {
    try {
      const response = await this.deleteDeck(this.state.mainEndpoint, deckID);
      const newDecks = this.state.decks.filter(function (deck) {
        return deck._id !== response.data._id;
      });
      this.setState({
        decks: newDecks,
      });
    } catch (error) {
      console.log(error);
    }
  }

  goToPreviousCard() {
    let tempCardNumber = this.state.activeCard;
    tempCardNumber--;
    if (tempCardNumber < 0) {
      tempCardNumber = this.state.activeCards.length - 1;
    }
    this.setState({
      activeCard: tempCardNumber,
    });
  }

  goToNextCard() {
    let tempCardNumber = this.state.activeCard;
    tempCardNumber++;
    if (tempCardNumber === this.state.activeCards.length) {
      tempCardNumber = 0;
    }
    this.setState({ activeCard: tempCardNumber });
  }

  render() {
    return (
      <div className="container justify-content-center">
        <Title />
        <Decks data={this.state.decks} callDeleteDeck={(id) => this.callDeleteDeck(id)} toggleVisibility={(comp) => this.toggleVisibility(comp)} />
        {this.state.showNewDeck === true ? <NewDeck setNewDeck={(deck) => this.setNewDeck(deck)} toggleVisibility={(comp) => this.toggleVisibility(comp)} /> : null}
      </div>
    );
  }
}

export default App;
