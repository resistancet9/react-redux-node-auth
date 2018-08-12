import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import { Route, Redirect } from "react-router-dom";
import RequireAuth from "./components/auth/require_auth";

const Feature = () => {
  return <div> Feature </div>;
};

const Home = () => {
  return <div> Home </div>;
};

const About = () => {
  return <div> About </div>;
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/logout" render={() => <Redirect to="/" />} />
        <Route path="/feature" component={RequireAuth(Feature)} />
        <Route path="/about" component={About} />
      </div>
    );
  }
}

export default App;
