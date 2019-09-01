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
    <Button text="button" icon="search" size="large" type="button" disabled={true} />
    <Button text="button" icon="search" size="medium" type="button" alt={true} disabled={true} />
    <Button text="button" icon="search" size="small" type="button" alt={true} />
    <Button text="More Info" size="medium" type="button" category={true} />
    <Button text="Translate" size="medium" type="button" header={true} disabled={true} />
  </div>
);

export default App;
