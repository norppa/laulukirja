import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from 'react-router-dom'
import store from "./store";
import SongBook from "./song-book/SongBook";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SongBook} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
