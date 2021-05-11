import React from "react";
import Card from "../Card/Card";
import Button from "../Button/Button";

const CardViewer = (props) => {
  return (
    <>
      <div className="row row-spacer text-center">
        <div className="col-sm-2">
          <Button
            btnType="button"
            btnStyle="btn btn-outline-dark"
            clickAction={props.previousCard}
            text="Previous Card"
          />
        </div>
        <div className="col-md-6">
          <Card
            flipCard={props.flipCard}
            card={props.card}
            showAnswer={props.showAnswer}
            totalCards={props.totalCards}
            cardIndex={props.cardIndex}
          />
        </div>
        <div className="col-sm-2">
          <Button
            btnType="button"
            btnStyle="btn btn-outline-dark"
            clickAction={props.nextCard}
            text="Next Card"
          />
        </div>
      </div>
      <Button
        btnType="button"
        btnStyle="btn btn-outline-success"
        clickAction={props.toggleVisibility}
        useParams="showNewCard"
        text="Add new card"
      />
      <Button
        btnType="button"
        btnStyle="btn btn-outline-primary"
        clickAction={props.toggleVisibility}
        useParams="showDecks"
        text="Switch Deck"
      />
      <Button
        btnType="button"
        btnStyle="btn btn-outline-danger"
        clickAction={props.callDeleteCard}
        useParams={props.activeCard}
        text="Delete Card"
      />
      <Button
        btnType="button"
        btnStyle="btn btn-outline-warning"
        clickAction={props.toggleVisibility}
        useParams="showCardEdit"
        text="Edit this card"
      />
      {props.showCardEdit !== false ? (
        <form
          name={props.submitTarget}
          onSubmit={(event) => props.handleSubmit(event)}
          className=""
        >
          <div className="input-group">
            <label htmlFor="inputCard" className="col-sm-2 col-form-label">
              Update Card:
            </label>
            <span id="inputCard" className="input-group-text">
              Question:
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
            <span className="input-group-text">Answer:</span>
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
      ) : null}
    </>
  );
};

export default CardViewer;
