import React from "react";
import { Helmet } from "react-helmet";

class Application extends React.Component {
  render() {
    return (
      <div className="application">
        <Helmet>
          <style>{"body { background-color: red; }"}</style>
        </Helmet>
        ...
      </div>
    );
  }
}

export default Application;
