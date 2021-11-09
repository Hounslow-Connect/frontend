import React, { Fragment, FunctionComponent } from 'react';
import { IService } from '../../../types/types';
import find from 'lodash/find';
import SearchResultCard from '../../../components/SearchResultCard';
import ResultsStore from '../../../stores/resultsStore';

interface IProps {
  resultsList: IService[];
  resultsStore: ResultsStore;
  activeId?: string;
  activeIdHandler?: any;
}

const List: FunctionComponent<IProps> = ({
  resultsList,
  resultsStore,
  activeId,
  activeIdHandler,
}) => {
  const setActiveId = (id: string) => {
    activeIdHandler(id);
  };

  return (
    <Fragment>
      <div className="results__container">
        {resultsList.map((list: any) => {
          const organisation =
            find(resultsStore.organisations, ['id', list.organisation_id]) || null;
          return (
            <SearchResultCard
              resultsStore={resultsStore}
              key={list.id}
              activeIdHandler={setActiveId}
              isActive={activeId === list.id}
              result={list}
              organisation={organisation}
            />
          );
        })}
      </div>
    </Fragment>
  );
};
export default List;
