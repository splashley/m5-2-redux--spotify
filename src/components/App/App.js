import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import ArtistRoute from "./ArtistRoute";

const DEFAULT_ARTIST_ID = "5z1VAFwT35EVvCp1XlZZuL";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Route>
        <Route path="/artists/:id">
          <ArtistRoute />
        </Route>
      </Switch>
      <GlobalStyles />
    </Router>
  );
};

export default App;
