import React, { Fragment, Component } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import { withRouter, RouteComponentProps } from 'react-router';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ResultsStore from '../../../stores/resultsStore';
import KeywordFilter from './KeywordFilter';
import WindowSizeStore from '../../../stores/windowSizeStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps extends RouteComponentProps {
  resultsStore?: ResultsStore;
  windowSizeStore?: WindowSizeStore;
}

interface IState {
  editToggled: boolean;
}

@inject('resultsStore', 'windowSizeStore')
@observer
class Keyword extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      editToggled: false,
    };
  }

  toggleEdit = () => {
    this.setState({
      editToggled: !this.state.editToggled,
    });
  };

  render() {
    const { resultsStore, windowSizeStore, history, location } = this.props;
    const { editToggled } = this.state;

    const searchTerm = location.search.match(/\?search_term=(.*)/);

    if (!resultsStore || !windowSizeStore) {
      return null;
    }
    return (
      <Fragment>
        {editToggled && (
          <div className="mobile-show tablet-show flex-container results__keyword-edit">
            <div role="button" aria-label="Close edit popup" onClick={() => this.toggleEdit()}>
              <p>Close</p> <FontAwesomeIcon icon="times" />
            </div>
          </div>
        )}
        <div className="flex-container">
          {/* Mobile Edit  */}
          <div className="mobile-show tablet-show flex-col flex-col--mobile--7">
            <h1>Search results</h1>
            <p>{searchTerm ? searchTerm[1] : ''}</p>
          </div>
          <div className="mobile-show tablet-show flex-col flex-col--mobile--5 results__mobile-edit">
            <Button text="Edit Search" size="small" onClick={() => this.toggleEdit()} />
          </div>

          {/* Desktop */}

          <div className="flex-col flex-col--12 mobile-hide tablet-hide">
            <h1 className="results__keyword-heading">Search results</h1>
          </div>
          <form className="flex-container flex-container--align-bottom mobile-hide tablet-hide results__keyword-search-container">
            <div className="flex-col flex-col--6 flex-col--tablet--7 results__keyword-input-box">
              <label htmlFor="keyword">
                <h2>I'm looking for</h2>
              </label>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  resultsStore.handleKeywordChange(e)
                }
                id="keyword"
                placeholder={get(resultsStore, 'keyword', '') || ''}
                value={get(resultsStore, 'keyword', '') || ''}
                className="results__search-box-keyword"
              />
              <Button
                icon={windowSizeStore.isMobile ? undefined : 'search'}
                text="Search"
                onClick={() => {
                  history.push({
                    search: resultsStore.updateQueryStringParameter(
                      'search_term',
                      resultsStore.keyword
                    ),
                  });
                }}
              />
            </div>
            <div className="flex-col flex-col--5 flex-col--tablet--5">
              <KeywordFilter />
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Keyword);
