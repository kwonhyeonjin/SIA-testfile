import React,  { Component } from "react";
import { hot } from "react-hot-loader";
import Photo from "./Photo";

class App extends Component {
    render() {
        return <Photo />;
    }
}
export default hot(module)(App);