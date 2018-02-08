import React from "react";
import ReactDOM from "react-dom";
import reactDvr from "../../src/index";

const List = reactDvr({ localStorageKey: "__react-dvr-demo__" })(({ items }) =>
  items.map((item, index) => <div key={index}>{item}</div>)
);

class App extends React.Component {
  state = {
    items: [],
    text: ""
  };

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  handleAddItem = () => {
    const { items, text } = this.state;
    this.setState({ items: items.concat(text), text: "" });
  };

  render() {
    const { items, text } = this.state;

    return (
      <div>
        <input type="text" value={text} onChange={this.handleChange} />
        <button onClick={this.handleAddItem}>Add</button>
        <List items={items} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("demo"));
