import React from "react";

const Decks = (props) => {
  const decks = props.data;
  return (
    <div className="container justify-content">
      <h2 className="text-center">Card Decks</h2>
      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
        <ul>
          {decks.map((deck) => (
            <>
              <input type="radio" className="btn-check" name="btnradio" id={deck._id} autoComplete="off" />
              <label className="btn btn-outline-primary" htmlFor={deck._id}>
                {deck.technology}
              </label>
            </>
          ))}
          <button className="btn btn-outline-secondary">+</button>
        </ul>
      </div>
    </div>
  );
};

export default Decks;
