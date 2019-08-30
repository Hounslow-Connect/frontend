import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import './App.scss';

// add all free font awesome icons to project

library.add(fas);

const App: React.FunctionComponent = () => (
  <div>
    <h1 className="example">Hello World!</h1>
  </div>
);

export default App;
