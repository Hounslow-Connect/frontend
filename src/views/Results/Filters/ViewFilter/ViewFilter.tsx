import React from 'react';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

import Button from '../../../../components/Button';
import ResultsStore from '../../../../stores/resultsStore';
import './ViewFilter.scss';

interface IProps {
  resultsStore?: ResultsStore;
  resultsSwitch?: boolean;
}

const ViewFilters: React.FunctionComponent<IProps> = ({ resultsStore, resultsSwitch }) => {
  if (!resultsStore) {
    return null;
  }

  return (
    <div className={cx('results__view-filter')}>
      <p className="view-filter--header">{resultsSwitch ? ' View as:' : 'View As'}</p>
      <Button
        text="Grid"
        icon="th-large"
        light={resultsStore.view !== 'grid'}
        onClick={() => resultsStore.toggleView('grid')}
      />
      <Button
        text="Map"
        icon="map-marker-alt"
        light={resultsStore.view !== 'map'}
        onClick={() => resultsStore.toggleView('map')}
      />
    </div>
  );
};

export default inject('resultsStore')(observer(ViewFilters));
