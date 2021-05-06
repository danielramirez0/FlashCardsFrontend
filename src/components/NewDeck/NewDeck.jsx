import React, { Component } from "react";
import Title from "../Title/Title";

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      technology: "",
      cards: [],
      word: "",
      definition: "",
      showAddCards: false,
    };
  }

  componentDidMount() {
    this.inputTechnology.focus();
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.technology !== "") {
      const deck = {
        technology: this.state.technology,
        cards: this.state.cards,
      };
      if (this.state.cards.length < 1 && this.state.word !== "" && this.state.definition !== "") {
        const newCard = {
          word: this.state.word,
          definition: this.state.definition,
        };
        deck.cards = [...deck.cards, newCard];
      }
      this.props.setNewDeck(deck);
      this.setState({
        technology: "",
        cards: [],
      });
    }
    this.props.toggleVisibility("showNewDeck");
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
    this.inputWord.focus();
  }

  render() {
    return (
      <>
        <Title type="Subtitle" subtext="Add New Deck Form" />
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group row">
            <label htmlFor="inputTechnology" className="col-sm-2 col-form-label">
              Name of Deck:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="technology"
                onChange={(e) => this.handleChange(e)}
                value={this.state.technology}
                id="inputTechnology"
                placeholder="Enter technology name for the new deck!"
                ref={(input) => {
                  this.inputTechnology = input;
                }}
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="inputCard" className="col-sm-2 col-form-label">
              Add card with Deck (Optional)
            </label>
            <span id="inputCard" className="input-group-text">
              Word:
            </span>
            <input
              type="text"
              className="form-control"
              name="word"
              onChange={(e) => this.handleChange(e)}
              value={this.state.word}
              id="inputWord"
              placeholder="Enter word to add"
              ref={(input) => (this.inputWord = input)}
            />
            <span className="input-group-text">Definition:</span>
            <input
              type="text"
              className="form-control"
              name="definition"
              onChange={(e) => this.handleChange(e)}
              value={this.state.definition}
              id="inputDefinition"
              placeholder="Enter definition for word"
            />
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => this.addMoreCards()}
            >
              Add another card
            </button>
          </div>
          {this.state.showAddCards === true ? (
            <h6 className="text-center">CARDS THAT WILL BE ADDED WITH NEW DECK</h6>
          ) : null}
          <ul className="text-center">
            {this.state.cards.map((card, index) => (
              <div className="text-center" key={index}>
                <label className="text-center">WORD:</label>
                <span className="text-center"> {card.word}, </span>
                <label className="text-center"> DEFINITION: </label>
                <span className="text-center"> {card.definition} </span>
              </div>
            ))}
          </ul>
          <p className="text-center">NOTE: Additional cards can be added afterwards as well</p>
          <div className="form-group row">
            <div className="col-sm-10 ">
              <button type="submit" className="btn btn-primary">
                Submit New Deck
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default NewDeck;
