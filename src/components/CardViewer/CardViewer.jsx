import React from "react";
import Card from "../Card/Card";

const CardViewer = (props) => {
  return (
    <div className="row row-spacer">
      <div className="col-sm-2">
        <button onClick={() => props.previousCard()}>Previous Card</button>
      </div>
      <div className="col-md-4">
        <Card
          flipCard={props.flipCard}
          card={props.card}
          showAnswer={props.showAnswer}
          totalCards={props.totalCards}
          cardIndex={props.cardIndex}
        />
      </div>
      <div className="col-sm-2">
        <button onClick={() => props.nextCard()}>Next Card</button>
      </div>
    </div>
  );
};

export default CardViewer;
