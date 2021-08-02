
import { Route } from "react-router-dom";
import React from "react";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from "./components/charaDetail.jsx/characterDetail";
import Post from "./components/Post/Post";


function App() {
  return (
    <React.Fragment>
         <Route exact path="/" component={LandingPage} />
         <Route path="/home" component={Home} /> 
         <Route path ="/post" component={Post} /> 
        <Route exact path="/home/:idPersonaje" component={Detail} /> 

    </React.Fragment>
);
}

export default App;

