import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import Button from './components/Button';

// add all free font awesome icons to project

library.add(fas);

const App: React.FunctionComponent = () => (
  <div>
    <h1>hehehe</h1>
    <h2>hehehe</h2>
    <h3>hehehehe</h3>
    <Button text="button" icon="search" size="large" />
  </div>
);

export default App;
