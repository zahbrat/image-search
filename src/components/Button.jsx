import { Component } from "react";

export default class Button extends Component {
  render() {
    return (
      <div className="button-container">
        <button type="button" onClick={this.props.onClick} className="button">
          Load more
        </button>
      </div>
    );
  }
}
