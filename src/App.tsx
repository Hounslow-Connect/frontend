import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';

import Home from './views/Home';
import NotFound from './views/NotFound';
import Results from './views/Results';

import React, { Component } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header';
// add all free font awesome icons to project

import './styles/grid.scss';
import WindowSizeStore from './stores/windowSizeStore';
import UIStore from './stores/uiStore';

library.add(fas);

const windowSizeStore = new WindowSizeStore();
const uiStore = new UIStore();

class App extends Component {
  componentDidMount() {
    windowSizeStore.setWindow();
  }

  render() {
    return (
      <Provider windowSizeStore={windowSizeStore} uiStore={uiStore}>
        <Header />
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/results" component={Results} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Footer />
      </Provider>
    );
  }
}

export default observer(App);
