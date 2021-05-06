import React from "react";
import Card from "../Card/Card";

const CardViewer = (props) => {
  return (
    <div className="row row-spacer">
      <div className="col-md-4">
        <button onClick={() => props.previousCard()}>Previous Card</button>
      </div>
      <div className="col-md-4">
        <Card card={props.card} />
      </div>
      <div className="col-md-4">
        <button onClick={() => props.nextCard()}>Next Card</button>
      </div>
    </div>
  );
};

export default CardViewer;
