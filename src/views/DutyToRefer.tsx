import React from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';

import Housing from '../assets/images/duty-to-refer/housing.png';
import Debt from '../assets/images/duty-to-refer/debt.png';
import MentalHealth from '../assets/images/duty-to-refer/mental-health.png';
import Shelter from '../assets/images/duty-to-refer/shelter.png';

import CMSPage from '../components/CMSPageLayout';

import './DutyToRefer.scss';

const DutyToRefer: React.FunctionComponent = () => {
  return (
    <CMSPage title="Duty to refer" breadcrumb="Duty to refer">
      <Helmet>
        <title>Duty to refer | Hounslow Connect</title>
      </Helmet>

      <section>
        <div className="flex-container flex-container--justify">
          <div className="cta">
            <div className="cta--content">
              <p>
                Help can be as simple as a click. Fulfil your statutory duty, but, if you can:
                please take a minute to see if a service may be able to make a more immediate
                impact. Your intervention could keep the roof over someone’s head.
              </p>
              <a href="mailto:dutytorefer@Hounslow.gov.uk">
                Click to report <i className="fas fa-envelope" aria-hidden={true} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex-container">
          <div className="flex-col flex-col--12">
            <h3 className="pod--title">Browse relevant services</h3>
          </div>
        </div>

        <div className="flex-container">
          <div className="flex-col flex-col--6">
            <div className="pod">
              <a href="/favourites?ids=982921e8-f84b-46b0-9c60-cf547acb9b61,e1f7aa99-bf02-4c85-ae49-0f82c4250c4a,3b6ddc4c-364e-4d50-9d4c-7db11794d6f4,607c8777-92ee-444a-886c-d8346513ea14,fcb3e8e5-b1a7-4d68-b53a-6f7676576ec6">
                <div className="pod__image">
                  <img src={Housing} alt="Specialist Housing Services" />
                </div>

                <div className="pod__content">
                  <p className="pod__title">
                    <strong>Specialist Housing Services</strong>
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="flex-col flex-col--6">
            <div className="pod">
              <a href="https://www.stepchange.org/" target="_blank" rel="noopener noreferrer">
                <div className="pod__image">
                  <img src={Debt} alt="Quick Debt Advice" />
                </div>

                <div className="pod__content">
                  <p className="pod__title">
                    <strong>Quick Debt Advice</strong>
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="flex-col flex-col--6">
            <div className="pod">
              <a href="/favourites?ids=dc6735b1-c5cf-4787-bf2d-5129ab19be70,abb0bcd1-d35a-4351-baa8-c07821c1b205,5b23e8a2-0e29-4c00-987d-dbcd72fcf937,607c8777-92ee-444a-886c-d8346513ea14,3cd7967d-a3d9-4c4e-a7ee-ef87c590f5f9,50fc80af-1138-4779-bd10-529473aaa951,3b6ddc4c-364e-4d50-9d4c-7db11794d6f4,b8c87640-8782-4c91-b857-d4c32e46ecae">
                <div className="pod__image">
                  <img src={MentalHealth} alt="Mental Health Services" />
                </div>

                <div className="pod__content">
                  <p className="pod__title">
                    <strong>Mental Health Services</strong>
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="flex-col flex-col--6">
            <div className="pod">
              <a
                href="https://england.shelter.org.uk/get_help"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="pod__image">
                  <img src={Shelter} alt="Shelter" />
                </div>

                <div className="pod__content">
                  <p className="pod__title">
                    <strong>Shelter</strong>
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </CMSPage>
  );
};

export default observer(DutyToRefer);
