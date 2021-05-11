import React from "react";
import Title from "../Title/Title";
import Button from "../Button/Button";

const NewDeck = (props) => {
  const cards = props.cards;
  return (
    <>
      <Title type="Subtitle" subtext="Add New Deck Form" />
      <form name="submitDeck" onSubmit={(event) => props.handleSubmit(event)}>
        <div className="form-group row">
          <label htmlFor="inputTechnology" className="col-sm-2 col-form-label">
            Name of Deck:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="technology"
              onChange={(event) => props.handleChange(event)}
              value={props.technology}
              id="inputTechnology"
              placeholder="Enter technology name for the new deck!"
              // ref={(input) => {
              // this.inputTechnology = input;
              // }}
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
            onChange={(event) => props.handleChange(event)}
            value={props.word}
            id="inputWord"
            placeholder="Enter word to add"
            // ref={(input) => (this.inputWord = input)}
          />
          <span className="input-group-text">Definition:</span>
          <input
            type="text"
            className="form-control"
            name="definition"
            onChange={(event) => props.handleChange(event)}
            value={props.definition}
            id="inputDefinition"
            placeholder="Enter definition for word"
          />
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => props.addMoreCards()}
          >
            Add another card
          </button>
        </div>
        {props.showAddCards === true ? (
          <h6 className="text-center">CARDS THAT WILL BE ADDED WITH NEW DECK</h6>
        ) : null}
        <ul className="text-center">
          {cards.map((card, index) => (
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
      <Button
        btnType="button"
        btnStyle="btn btn-danger"
        clickAction={() => props.toggleVisibility("resetUI")}
        text="Cancel"
      />
    </>
  );
};

export default NewDeck;
