import React, { Component } from "react";
import Title from "./components/Title/Title";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
    };
  }
  render() {
    return (
      <div>
        <Title />
      </div>
    );
  }
}

export default App;
