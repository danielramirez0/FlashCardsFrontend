import React from "react";
const Decks = (props) => {
  const decks = props.data;
  return (
    <div className="container justify-content">
      <h2 className="text-center">Card Decks</h2>
      <div className="d-flex">
        {decks.map((deck) => (
          <div key={deck._id} className="card text-center">
            <div className="card-body">
              <h5 className="card-title">{deck.technology}</h5>
              {/* <p className="card-text">{deck.technology}</p> */}
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => props.setCardViewer(deck)}
              >
                Study {deck.technology}
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => props.callDeleteDeck(deck._id)}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-outline-warning"
                onClick={() => props.setEditDeckForm(deck)}
              >
                Edit Deck
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => props.toggleVisibility("showNewDeck")}
        >
          New Deck
        </button>
      </div>
    </div>
  );
};

export default Decks;
