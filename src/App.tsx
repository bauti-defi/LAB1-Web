import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppNavigator from "./navigation/app.navigator";
import store from "./storage/app.store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
