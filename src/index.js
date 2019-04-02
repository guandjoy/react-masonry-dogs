import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import apolloClient from "./ApolloClient";
import "./styles.css";

import Filter from "./components/Filter";
import Images from "./components/Images";
import NavBar from "./components/NavBar";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <NavBar />
        <Filter />
        <Images />
      </div>
    </ApolloProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
