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
          <div className="mobile-show flex-container results__keyword-edit">
            <div role="button" aria-label="Close edit popup" onClick={() => this.toggleEdit()}>
              <p>Close</p> <FontAwesomeIcon icon="times" />
            </div>
          </div>
        )}
        <div className="flex-container">
          <div className="mobile-show flex-col flex-col--mobile--7">
            <h1>Search results</h1>
            <p>{searchTerm ? searchTerm[1] : ''}</p>
          </div>
          <div className="mobile-show flex-col flex-col--mobile--5 results__mobile-edit">
            <Button text="Edit Search" size="small" onClick={() => this.toggleEdit()} />
          </div>
        </div>
      </Fragment>
      // <Fragment>
      //   <div className="flex-col flex-col--7 flex-col--tablet--12 flex-col--mobile-4 flex-container--mobile-no-padding results__search-left">
      //     <div className="flex-container">
      //       <div className="flex-col flex-col--6 flex-col--mobile--6">
      //         <h4>Search results</h4>
      //         {windowSizeStore.isMobile && <p>{resultsStore.keyword}</p>}
      //       </div>
      //       {windowSizeStore.isMobile && (
      //         <div className="flex-col flex-col--6 flex-col--mobile--6 results__mobile-edit">
      //           <Button text="Edit Search" size="small" onClick={() => this.toggleEdit()} />
      //         </div>
      //       )}
      //     </div>

      //     {((windowSizeStore.isMobile && editToggled) || !windowSizeStore.isMobile) && (
      //       <Fragment>
      //         <form className="flex-container flex-container--align-bottom results__search-box-info">
      //           <div className="flex-col flex-col--mobile--8">
      //             <label htmlFor="keyword">I'm looking for</label>
      //             <Input
      //               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      //                 resultsStore.handleKeywordChange(e)
      //               }
      //               id="keyword"
      //               placeholder={get(resultsStore, 'keyword', '') || ''}
      //               className="results__search-box-keyword"
      //               value={get(resultsStore, 'keyword', '') || ''}
      //             />
      //           </div>
      //           <div className="flex-col flex-col--mobile--4 results__mobile-edit">
      //             <Button
      //               icon={windowSizeStore.isMobile ? undefined : 'search'}
      //               text="Search"
      //               onClick={() => {
      //                 history.push({
      //                   search: resultsStore.updateQueryStringParameter(
      //                     'search_term',
      //                     resultsStore.keyword
      //                   ),
      //                 });
      //               }}
      //               size={windowSizeStore.isMobile ? 'small' : 'medium'}
      //             />
      //           </div>
      //         </form>
      //       </Fragment>
      //     )}
      //   </div>
      //   {((windowSizeStore.isMobile && editToggled) || !windowSizeStore.isMobile) && (
      //     <div className="flex-col flex-col--4 flex-col--tablet--12 flex-col--mobile-4 flex-container--mobile-no-padding">
      //       <KeywordFilter />
      //     </div>
      //   )}
      // </Fragment>
    );
  }
}

export default withRouter(Keyword);
