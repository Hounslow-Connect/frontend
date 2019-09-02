import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './views/Home';
import NotFound from './views/NotFound';
import Results from './views/Results';

import React, { Fragment } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header';
// add all free font awesome icons to project

import './styles/grid.scss';

library.add(fas);

const App: React.FunctionComponent = () => (
  <Fragment>
    <Header />
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/results" component={Results} />
        <Route component={NotFound} />
      </Switch>
    </Router>
    <Footer />
  </Fragment>
);

export default App;
