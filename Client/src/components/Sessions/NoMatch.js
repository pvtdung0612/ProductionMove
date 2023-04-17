import React from "react";

class NoMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h2>Page not found</h2>
      </div>
    );
  }
}

export default NoMatch;
