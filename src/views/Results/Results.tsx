import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import queryString from 'query-string';
import find from 'lodash/find';

import ResultStore from '../../stores/resultsStore';
import SearchResultCard from '../../components/SearchResultCard';
class Results extends Component<{ location: Location; resultsStore: ResultStore }> {
  componentDidMount() {
    const { resultsStore, location } = this.props;
    const searchTerms = queryString.parse(location.search);

    resultsStore.setSearchTerms(searchTerms);
  }

  componentWillUnmount() {
    const { resultsStore } = this.props;

    resultsStore.clear();
  }

  render() {
    const { resultsStore } = this.props;

    return (
      <section style={{ display: 'flex', flexDirection: 'column', padding: '8px' }}>
        {resultsStore.loading
          ? 'Loading'
          : resultsStore.results.map((result: any) => {
              const organisation = find(resultsStore.organisations, ['id', result.organisation_id]);

              return (
                <SearchResultCard key={result.id} result={result} organisation={organisation} />
              );
            })}
      </section>
    );
  }
}

export default inject('resultsStore')(observer(Results));
