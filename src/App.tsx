import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/navigation.bar";
import AppNavigator from "./navigation/app.navigator";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <AppNavigator />
    </BrowserRouter>
  );
}

export default App;
