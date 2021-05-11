import React from "react";
import Title from "../Title/Title";
import Button from "../Button/Button";
const CardCreator = (props) => {
  return (
    <>
      <Title type="Subtitle" subtext={`Add New Card Form:`} />
      <Title extratext={`Deck:  ${props.activeDeck.technology}`} />
      <form name={props.submitTarget} onSubmit={(event) => props.handleSubmit(event)} className="">
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
        </div>
        <div className="form-group row">
          <div className="col-sm-10 ">
            <button type="submit" className="btn btn-primary">
              Submit Card
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

export default CardCreator;
