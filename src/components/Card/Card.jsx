import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <div className="cover">
        <h1 className="title">{props.card.word}</h1>
        <h4 className="description">{props.card.definition}</h4>
      </div>
    </div>
  );
};

export default Card;
