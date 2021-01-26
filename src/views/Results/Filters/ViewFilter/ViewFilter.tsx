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
    <div
      className={cx(
        'view-filter__search-bar',
        {
          'flex-col flex-col--5 flex-col--tablet--6 flex-col--tablet-large--5 flex-col--mobile--7 flex-col--mobile-small--12 flex-container--mobile-no-padding flex-col--medium--6':
            resultsStore.postcode,
        },
        { 'view-filter--right-align': resultsSwitch },
        {
          'flex-col--tablet--6 flex-col--6 flex-col--mobile--12 flex-col--medium--7 view-filter--right-align--float-right': !resultsStore.postcode,
        }
      )}
    >
      <p
        className={cx('view-filter--header', {
          'view-filter--header--light': resultsSwitch,
        })}
      >
        {resultsSwitch ? ' View as:' : 'View As'}
      </p>
      <Button
        text="Grid"
        icon="th-large"
        light={resultsStore.view !== 'grid'}
        onClick={() => resultsStore.toggleView('grid')}
      />
      <Button
        text="Map"
        icon="map"
        light={resultsStore.view !== 'map'}
        onClick={() => resultsStore.toggleView('map')}
      />
    </div>
  );
};

export default inject('resultsStore')(observer(ViewFilters));
