import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import App from "./App";
import FirebaseContext from "./context/firebaseContext";
import Firebase from "./services/firebase";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducers from "./reducers";
import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import thunk from 'redux-thunk';

const store = new createStore(rootReducers, applyMiddleware(thunk, logger));

ReactDOM.render(
<React.StrictMode>
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </FirebaseContext.Provider>
  </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
