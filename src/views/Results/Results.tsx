import React, { Component } from 'react';
import { observer } from 'mobx-react';
import queryString from 'query-string';
import ResultStore from '../../stores/resultsStore';
class Results extends Component<{ location: Location }> {
  componentDidMount() {
    const searchTerms = queryString.parse(this.props.location.search);

    ResultStore.setSearchTerms(searchTerms);
  }

  componentWillUnmount() {
    ResultStore.clear();
  }

  render() {
    return <p>results</p>;
  }
}

export default observer(Results);
