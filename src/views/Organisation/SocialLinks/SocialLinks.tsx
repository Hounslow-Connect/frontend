import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OrganisationStore from '../../../stores/organisationStore';
interface IProps {
  organisationStore: OrganisationStore;
}

const SocialLinks: React.FunctionComponent<IProps> = ({ organisationStore }) => {
  const { organisation } = organisationStore;

  return (
    <ul className="organisation__social-links">
      {organisation &&
        organisation.social_medias &&
        organisation.social_medias.map((social: any) => {
          return (
            <li key={social.type}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Go to ${social.type} social page`}
              >
                <FontAwesomeIcon size="lg" icon={['fab', social.type]} />
              </a>
            </li>
          );
        })}
    </ul>
  );
};

export default SocialLinks;
