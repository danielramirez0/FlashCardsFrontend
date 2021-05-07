import React from 'react';

class CardCreator extends Component {
    state = { 
        cards: [],
        word: "",
        definition: ""
     }

     ComponentDidMount(){
         this.inputWord.focus()
     }

  handleSubmit(event) {
    event.preventDefault();
      if (this.state.cards.length < 1 && this.state.word !== "" && this.state.definition !== "") {
        const newCard = {
          word: this.state.word,
          definition: this.state.definition,
        };
     let newCards = [...this.state.cards, newCard];
      }
      this.props.setNewDeck(deck);
      this.setState({
        technology: "",
        cards: [],
      });
    }
    this.props.toggleVisibility("showNewDeck");
  }


    render() { 
        return (  );
    }
}
 
export default CardCreator;