import React, { Component } from "react";

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      technology: "",
      cards: [],
      word: "",
      definition: "",
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    let deck = {
      technology: this.state.technology,
      cards: this.state.cards,
    };
    this.props.setNewDeck(deck);
    this.setState({
      technology: "",
      cards: [],
    });
  }

  handleChange(event) {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  updateNewDeckCards() {
    const newCard = {
      word: this.state.word,
      definition: this.state.definition,
    };
    this.setState({
      cards: [...this.state.cards, newCard],
      word: "",
      definition: "",
    });
  }

  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group row">
            <label htmlFor="inputTechnology" className="col=sm-2 col-form-label">
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
              />
            </div>
          </div>
          <div className="input-group">
            <span className="input-group-text">(Optional) Add card(s)</span>
            <input type="text" className="form-control" name="word" onChange={(e) => this.handleChange(e)} value={this.state.word} id="inputWord" placeholder="Enter word to add" />
            <input
              type="text"
              className="form-control"
              name="definition"
              onChange={(e) => this.handleChange(e)}
              value={this.state.definition}
              id="inputDefinition"
              placeholder="Enter definition for word"
            />
            <button type="button" onClick={() => this.updateNewDeckCards()}>
              Add card
            </button>
          </div>
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
