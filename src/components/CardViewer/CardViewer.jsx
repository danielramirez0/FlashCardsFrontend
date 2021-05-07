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
        text="Add card"
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
    </>
  );
};

export default CardViewer;
