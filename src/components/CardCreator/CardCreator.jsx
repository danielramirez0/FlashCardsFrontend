import React from "react";
import Title from "../Title/Title";

const CardCreator = (props) => {
  const cards = props.cards;
  return (
    <>
      <Title type="Subtitle" subtext="Add a new Card Form" />
      <form name="submitCards" onSubmit={(event) => props.handleSubmit(event)} className="">
        <div className="input-group">
          <label htmlFor="inputCard" className="col-sm-2 col-form-label">
            New Card To Add:
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
          <h6 className="text-center">CARDS THAT WILL BE ADDED TO DECK</h6>
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
        {/* <p className="text-center">NOTE: Additional cards can be added afterwards as well</p> */}
        <div className="form-group row">
          <div className="col-sm-10 ">
            <button type="submit" className="btn btn-primary">
              Submit New Card(s)
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CardCreator;
