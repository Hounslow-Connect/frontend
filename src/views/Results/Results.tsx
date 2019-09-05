import React, { Component } from 'react';
import { observer } from 'mobx-react';
import queryString from 'query-string';
import ResultStore from '../../stores/resultsStore';
class Results extends Component<{ location: Location }> {
  componentDidMount() {
    const searchTerms = queryString.parse(this.props.location.search);

    ResultStore.setSearchTerms(searchTerms);
  }

  render() {
    return <p>results</p>;
  }
}

export default observer(Results);

// const { category } = queryString.parse(this.props.location.search);
// // need nice way to slugify url, but keep special characters. State?
// if (category) {
//   const cat = await axios.get(`${apiBase}/collections/categories/${category}`);
//   const test = await axios.post(`${apiBase}/search?page=1`, {
//     category: startCase(category as string),
//     order: 'relevance',
//   });
//   console.log(test);
// }
