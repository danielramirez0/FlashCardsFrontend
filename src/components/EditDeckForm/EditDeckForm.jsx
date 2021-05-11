import React from "react";
import Button from "../Button/Button";
import Title from "../Title/Title";

const EditDeckForm = (props) => {
  const cards = props.activeCards;
  return (
    <>
      <Title type="Subtitle" subtext={`Edit Deck Form:`} />
      <Title extratext={`Deck:  ${props.activeDeck.technology}`} />
      <form name="changeDeck" onSubmit={(event) => props.handleSubmit(event)} className="">
        <h6 className="text-center">
          All changes are optional. Leave blank if no changes required.
        </h6>
        <div className="input-group">
          <label htmlFor="inputTech" className="col-sm-2 col-form-label">
            Change Deck Name
          </label>
          <span id="inputCard" className="input-group-text">
            Name:
          </span>
          <input
            type="text"
            className="form-control"
            name="technology"
            onChange={(event) => props.handleChange(event)}
            value={props.technology}
            id="inputWord"
            placeholder="Enter new name for deck"
            // ref={(input) => (this.inputWord = input)}
          />
        </div>
        <div className="">
          <h6 className="text-center">Cards In Deck</h6>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Card ID</th>
                <th scope="col">Card Question</th>
                <th scope="col">Card Answer</th>
                <th scope="col">Delete Card</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card) => (
                <tr key={card._id} className="">
                  <th scope="row">{card._id}</th>
                  <td>{card.word}</td>
                  <td>{card.definition}</td>
                  <td>
                    <Button
                      btnType="button"
                      btnStyle="btn btn-outline-danger"
                      clickAction={props.callDeleteCard}
                      useParams={card}
                      text="Delete"
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <Button
                    btnType="button"
                    btnStyle="btn btn-success"
                    clickAction={props.toggleVisibility}
                    useParams={"addCardToTable"}
                    text="Add card"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="form-group row">
          <div className="col-sm-10 ">
            <button type="submit" className="btn btn-primary">
              Submit Changes
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

export default EditDeckForm;
