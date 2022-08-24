import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Header} from './components';
import DetailsPage from './pages/DetailsPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/:id/:name/details" component={DetailsPage} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
