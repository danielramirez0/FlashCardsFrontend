import React, { Component } from "react";
import Title from "./components/Title/Title";
import Decks from "./components/Decks/Decks";
import NewDeck from "./components/NewDeck/NewDeck";
import CardViewer from "./components/CardViewer/CardViewer";

const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainEndpoint: "http://localhost:5000/api/decks/",
      decks: [],
      showDecks: true,
      showNewDeck: false,
      showNewCard: false,
      showCard: false,
      activeDeck: {},
      activeCard: 0,
      showAnswer: false,
      activeCards: [],
      technology: "",
      cards: [],
      word: "",
      definition: "",
      showAddCards: false,
    };
  }

  componentDidMount() {
    this.setAllDecks(this.state.mainEndpoint);
  }

  handleSubmit(event) {
    event.preventDefault();
    switch (event.target.name) {
      case "submitDeck":
        if (this.state.technology !== "") {
          const deck = {
            technology: this.state.technology,
            cards: this.state.cards,
          };
          if (
            this.state.cards.length < 1 &&
            this.state.word !== "" &&
            this.state.definition !== ""
          ) {
            const newCard = {
              word: this.state.word,
              definition: this.state.definition,
            };
            deck.cards = [...deck.cards, newCard];
          }
          this.setNewDeck(deck);
          this.setState({
            technology: "",
            word: "",
            definition: "",
            cards: [],
          });
        }
        this.toggleVisibility("showNewDeck");
        break;

      default:
        break;
    }
  }

  handleChange(event) {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  addMoreCards() {
    const newCard = {
      word: this.state.word,
      definition: this.state.definition,
    };
    this.setState({
      cards: [...this.state.cards, newCard],
      word: "",
      definition: "",
      showAddCards: true,
    });
    // this.inputWord.focus();
  }

  toggleVisibility(component) {
    switch (component) {
      case "showNewDeck":
        this.setState({
          [component]: !this.state[component],
          showCard: false,
          showDecks: !this.state.showDecks,
        });
        break;
      case "showDecks":
        this.setState({
          [component]: !this.state[component],
          showCard: false,
        });
        break;
      default:
        this.setState({
          [component]: !this.state[component],
        });
        break;
    }
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
      showAnswer: false,
    });
  }

  flipCard() {
    this.setState({
      showAnswer: !this.state.showAnswer,
    });
  }

  goToNextCard() {
    let tempCardNumber = this.state.activeCard;
    tempCardNumber++;
    if (tempCardNumber === this.state.activeCards.length) {
      tempCardNumber = 0;
    }
    this.setState({
      activeCard: tempCardNumber,
      showAnswer: false,
    });
  }

  getDeckCards(endpoint, deck) {
    return new Promise((res, rej) => {
      const response = axios.get(`${endpoint}/${deck._id}/cards`);
      if (response != null) {
        res(response);
      } else {
        rej(new Error(`Unable to delete deck at ${endpoint} with ID ${deck._id}`));
      }
    });
  }

  async setCardViewer(deck) {
    try {
      const response = await this.getDeckCards(this.state.mainEndpoint, deck);
      this.setState({
        activeDeck: deck,
        activeCards: response.data,
        activeCard: 0,
        showCard: true,
        showNewDeck: false,
        showDecks: false,
        showAnswer: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  postNewCard(endpoint, activeDeck, newCard) {
    return new Promise((res, rej) => {
      const response = axios.post(`${endpoint}/${activeDeck._id}/cards`, newCard);
      if (response != null) {
        res(response);
      } else {
        rej(new Error(`Unable to add new card at ${endpoint}`));
      }
    });
  }

  async setNewCard(newCard) {
    try {
      const response = await this.postNewCard(this.state.mainEndpoint, newCard);
      this.setState({
        activeCards: [response.data],
        activeCard: this.state.activeCards.length + 1,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="container justify-content-center">
        <Title type="Main" text="FLASH CARD STUDY TOOL" />
        {this.state.showDecks === true ? (
          <Decks
            data={this.state.decks}
            callDeleteDeck={(id) => this.callDeleteDeck(id)}
            toggleVisibility={(component) => this.toggleVisibility(component)}
            setCardViewer={(deck) => this.setCardViewer(deck)}
          />
        ) : null}
        {this.state.showNewDeck === true ? (
          <NewDeck
            setNewDeck={(deck) => this.setNewDeck(deck)}
            toggleVisibility={(component) => this.toggleVisibility(component)}
            handleChange={(ev) => this.handleChange(ev)}
            handleSubmit={(ev) => this.handleSubmit(ev)}
            addMoreCards={() => this.addMoreCards()}
            showAddCards={this.state.showAddCards}
            cards={this.state.cards}
            word={this.state.word}
            definition={this.state.definition}
          />
        ) : null}
        {this.state.showCard === true ? (
          <>
            <Title extratext="Currently studying:" />
            <Title type="Subtitle" subtext={this.state.activeDeck.technology} />
            <CardViewer
              card={this.state.activeCards[this.state.activeCard]}
              nextCard={() => this.goToNextCard()}
              previousCard={() => this.goToPreviousCard()}
              flipCard={() => this.flipCard()}
              showAnswer={this.state.showAnswer}
              totalCards={this.state.activeCards.length}
              cardIndex={this.state.activeCard + 1}
              setNewCard={() => this.setNewCard()}
              toggleVisibility={(component) => this.toggleVisibility(component)}
            />
          </>
        ) : null}
      </div>
    );
  }
}

export default App;
