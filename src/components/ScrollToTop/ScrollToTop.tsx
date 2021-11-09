import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollIntoView extends Component<any> {
  componentDidMount = () => window.scrollTo(0, 0);

  componentDidUpdate = (prevProps: any) => {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  };

  render = () => this.props.children;
}

export default withRouter(ScrollIntoView);
