import React from "react";

const Card = (props) => {
  return (
    <div onClick={() => props.flipCard()} className="card">
      <div className="cover">
        {props.showAnswer === false ? (
          <h1 className="title text-center">
            {props.card != null ? props.card.word : `This deck has no cards`}
          </h1>
        ) : (
          <p className="description text-center">
            {props.card != null ? props.card.definition : `Add some!`}
          </p>
        )}
      </div>
      <p className="text-center">
        {props.totalCards > 0 ? `${props.cardIndex}/${props.totalCards}` : null}
      </p>
    </div>
  );
};

export default Card;
