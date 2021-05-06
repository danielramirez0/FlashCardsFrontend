import React from "react";

const Card = (props) => {
  return (
    <div onClick={() => props.flipCard()} className="card">
      <div className="cover">
        {props.showAnswer === false ? (
          <h1 className="title">
            {props.card != null ? props.card.word : `This deck has no cards`}
          </h1>
        ) : (
          <p className="description">{props.card != null ? props.card.definition : `Add some!`}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
