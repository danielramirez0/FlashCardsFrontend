import React, { Component } from "react";
import Title from "./components/Title/Title";
import Decks from "./components/Decks/Decks";
import NewDeck from "./components/NewDeck/NewDeck";
import CardViewer from "./components/CardViewer/CardViewer";
import CardCreator from "./components/CardCreator/CardCreator";
import EditDeckForm from "./components/EditDeckForm/EditDeckForm";

const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainEndpoint: "http://localhost:5000/api/decks/",
      decks: [],
      showDecks: true,
      showNewDeck: false,
      showEditDeck: false,
      showCard: false,
      showNewCard: false,
      showAddCards: false,
      showAnswer: false,
      showCardEdit: false,
      activeDeck: {},
      activeCard: {},
      activeCardIndex: 0,
      activeCards: [],
      technology: "",
      cards: [],
      word: "",
      definition: "",
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
            technology: this.state.technology.toString(),
            cards: this.state.cards,
          };
          if (
            this.state.cards.length >= 0 &&
            this.state.word !== "" &&
            this.state.definition !== ""
          ) {
            const newCard = {
              word: this.state.word.toString(),
              definition: this.state.definition.toString(),
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
          this.toggleVisibility("showNewDeck");
        }
        break;
      case "submitCard":
        if (this.state.word !== "" && this.state.definition !== "") {
          const newCard = {
            word: this.state.word.toString(),
            definition: this.state.definition.toString(),
          };
          this.setNewCard(newCard);
          this.setState({
            activeCardIndex: this.state.activeCards.length,
            word: "",
            definition: "",
          });
          this.toggleVisibility("showNewCard");
        }
        break;
      case "updateTable":
        if (this.state.word !== "" && this.state.definition !== "") {
          const newCard = {
            word: this.state.word.toString(),
            definition: this.state.definition.toString(),
          };
          this.setNewCard(newCard);
          this.setState({
            word: "",
            definition: "",
          });
        }
        this.toggleVisibility("addCardToTable");
        break;
      case "changeDeck":
        const deck = this.state.activeDeck;
        if (this.state.technology !== "") {
          deck.technology = this.state.technology;
        }
        deck.cards = this.state.activeCards;
        this.changeDeck(deck);
        this.toggleVisibility("resetUI");
        break;
      case "updateCard":
        if (this.state.word !== "" && this.state.definition !== "") {
          const cardID = this.state.activeCard._id;
          const updateCard = {
            word: this.state.word.toString(),
            definition: this.state.definition.toString(),
          };
          const deckID = this.state.activeDeck._id;
        }
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
    if (this.state.word !== "" && this.state.definition !== "") {
      const newCard = {
        word: this.state.word.toString(),
        definition: this.state.definition.toString(),
      };
      this.setState({
        cards: [...this.state.cards, newCard],
        word: "",
        definition: "",
        showAddCards: true,
      });
    }
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
          activeDeck: {},
          activeCards: [],
          activeCard: {},
          activeCardIndex: 0,
        });
        break;
      case "showNewCard":
        this.setState({
          [component]: !this.state[component],
          showCard: !this.state.showCard,
        });
        break;
      case "showEditDeck":
        this.setState({
          [component]: !this.state[component],
          showDecks: !this.state.showDecks,
        });
        break;
      case "addCardToTable":
        this.setState({
          showNewCard: !this.state.showNewCard,
        });
        break;
      case "showCardEdit":
        this.setState({
          [component]: !this.state[component],
        });
        break;
      default:
        this.setState({
          showDecks: true,
          showNewDeck: false,
          showEditDeck: false,
          showCard: false,
          showNewCard: false,
          showAddCards: false,
          showAnswer: false,
          activeDeck: {},
          activeCard: {},
          activeCardIndex: 0,
          activeCards: [],
          technology: "",
          cards: [],
          word: "",
          definition: "",
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

  putChangesToDeck(endpoint, deckID, deck) {
    return new Promise((res, rej) => {
      const response = axios.put(`${endpoint}/${deckID}`, {
        technology: deck.technology,
        cards: deck.cards,
      });
      if (response != null) {
        res(response);
      } else {
        rej(new Error(`Unable to update deck at ${endpoint} with ID ${deckID}`));
      }
    });
  }

  async changeDeck(deck) {
    try {
      const response = await this.putChangesToDeck(this.state.mainEndpoint, deck._id, deck);
      if (response.data.technology === deck.technology) {
        this.setAllDecks();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async setEditDeckForm(deck) {
    try {
      const response = await this.getDeckCards(this.state.mainEndpoint, deck);
      this.setState({
        activeDeck: deck,
        activeCards: response.data,
        cards: response.data,
      });
    } catch (error) {
      console.log(error);
    }
    this.toggleVisibility("showEditDeck");
  }
  goToPreviousCard() {
    let tempCardNumber = this.state.activeCardIndex;
    tempCardNumber--;
    if (tempCardNumber < 0) {
      tempCardNumber = this.state.activeCards.length - 1;
    }
    this.setState({
      activeCardIndex: tempCardNumber,
      activeCard: this.state.activeCards[tempCardNumber],
      showAnswer: false,
    });
  }

  flipCard() {
    this.setState({
      showAnswer: !this.state.showAnswer,
    });
  }

  goToNextCard() {
    let tempCardNumber = this.state.activeCardIndex;
    tempCardNumber++;
    if (tempCardNumber === this.state.activeCards.length) {
      tempCardNumber = 0;
    }
    this.setState({
      activeCardIndex: tempCardNumber,
      activeCard: this.state.activeCards[tempCardNumber],
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
        activeCard: response.data[this.state.activeCardIndex],
        activeCardIndex: 0,
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
      const response = await this.postNewCard(
        this.state.mainEndpoint,
        this.state.activeDeck,
        newCard
      );
      this.setState({
        activeCards: response.data,
        activeCard: response.data[this.state.activeCardIndex],
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteCard(endpoint, activeDeck, activeCard) {
    return new Promise((res, rej) => {
      const response = axios.delete(`${endpoint}/${activeDeck._id}/cards/${activeCard._id}`);
      if (response != null) {
        res(response);
      } else {
        rej(new Error(`Unable to add new card at ${endpoint}`));
      }
    });
  }

  async callDeleteCard(card) {
    try {
      const response = await this.deleteCard(this.state.mainEndpoint, this.state.activeDeck, card);
      if (this.state.activeCardIndex === 0) {
        this.setState({
          activeCards: response.data,
          activeCard: response.data[this.state.activeCardIndex],
          activeCardIndex: this.state.activeCardIndex,
        });
      } else {
        this.setState({
          activeCards: response.data,
          activeCard: response.data[this.state.activeCardIndex - 1],
          activeCardIndex: this.state.activeCardIndex - 1,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: putChangesToCard;

  render() {
    return (
      <div className="container justify-content-center">
        <Title type="Main" text="FLASH CARD STUDY TOOL" />
        {this.state.showDecks === true ? (
          <Decks
            data={this.state.decks}
            callDeleteDeck={(id) => this.callDeleteDeck(id)}
            setEditDeckForm={(deck) => this.setEditDeckForm(deck)}
            toggleVisibility={(component) => this.toggleVisibility(component)}
            setCardViewer={(deck) => this.setCardViewer(deck)}
            changeDeck={(deck) => this.changeDeck(deck)}
          />
        ) : null}

        {this.state.showEditDeck === true ? (
          <EditDeckForm
            callDeleteCard={(card) => this.callDeleteCard(card)}
            toggleVisibility={(component) => this.toggleVisibility(component)}
            handleChange={(ev) => this.handleChange(ev)}
            handleSubmit={(ev) => this.handleSubmit(ev)}
            activeDeck={this.state.activeDeck}
            activeCards={this.state.activeCards}
            word={this.state.word}
            definition={this.state.definition}
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
              card={this.state.activeCards[this.state.activeCardIndex]}
              activeCard={this.state.activeCard}
              nextCard={() => this.goToNextCard()}
              previousCard={() => this.goToPreviousCard()}
              flipCard={() => this.flipCard()}
              callDeleteCard={(card) => this.callDeleteCard(card)}
              showAnswer={this.state.showAnswer}
              showCardEdit={this.state.showCardEdit}
              totalCards={this.state.activeCards.length}
              cardIndex={this.state.activeCardIndex + 1}
              setNewCard={() => this.setNewCard()}
              toggleVisibility={(component) => this.toggleVisibility(component)}
              handleChange={(ev) => this.handleChange(ev)}
              handleSubmit={(ev) => this.handleSubmit(ev)}
              submitTarget={"updateCard"}
            />
          </>
        ) : null}
        {this.state.showNewCard === true ? (
          <CardCreator
            toggleVisibility={(component) => this.toggleVisibility(component)}
            activeDeck={this.state.activeDeck}
            submitTarget={this.state.showEditDeck === true ? "updateTable" : "submitCard"}
            handleChange={(ev) => this.handleChange(ev)}
            handleSubmit={(ev) => this.handleSubmit(ev)}
            word={this.state.word}
            definition={this.state.definition}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
