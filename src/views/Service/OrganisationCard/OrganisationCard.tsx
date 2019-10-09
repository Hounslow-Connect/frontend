import React from 'react';
import get from 'lodash/get';
import cx from 'classnames';

import FallBackLogo from '../../../assets/images/logo-fallback.png';

import { apiBase } from '../../../config/api';
import { IService } from '../../../types/types';

interface IProps {
  service: IService;
  sidebar?: boolean;
}

const OrganisationCard: React.FunctionComponent<IProps> = ({ service, sidebar }) => (
  <div
    className={cx('flex-container flex-container--mobile-no-padding', {
      'flex-container--align-center service__organisation--sidebar': sidebar,
    })}
  >
    <div className="flex-col flex-col--4 flex-col--mobile--12 flex-col--tablet--12 service__organisation service__organisation--logo">
      {get(service, 'organisation.has_logo') ? (
        <img
          src={`${apiBase}/organisations/${service.organisation_id}/logo.png?v=${service.updated_at}&max_dimension=100`}
          alt={`${get(service, 'organisation.name')} Logo`}
        />
      ) : (
        <img src={FallBackLogo} style={{ width: 100 }} alt="No logo" />
      )}
    </div>
    <div className="flex-col flex-col--8 flex-col--mobile--12 flex-col--tablet--12 service__organisation">
      <h4>{get(service, 'organisation.name')}</h4>
    </div>
  </div>
);

export default OrganisationCard;
