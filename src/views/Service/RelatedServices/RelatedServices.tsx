import React, { Component } from 'react';

import RelatedServicesCard from './RelatedServicesCard';
import { IService } from '../../../types/types';

import './RelatedServices.scss';
import Button from '../../../components/Button';

interface IProps {
  relatedServices: IService[];
}

interface IState {
  fullList: IService[];
  preview: IService[];
  showMore: boolean;
}

class RelatedServices extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      fullList: [],
      preview: [],
      showMore: false,
    };
  }

  componentDidMount() {
    console.log(this.props.relatedServices.slice(3));
    this.setState({
      fullList: this.props.relatedServices,
      preview: this.props.relatedServices.slice(0, 3),
    });
  }

  showMore = () => {
    this.setState({
      showMore: true,
    });
  };

  render() {
    const { showMore, fullList, preview } = this.state;

    const relatedServices = showMore ? fullList : preview;
    return (
      <section className="related-services">
        <div className="flex-container">
          <div className="flex-col flex-col--12 flex-col--mobile--12">
            <h1>Related Services</h1>
            <p className="body--l">Similar services for you to explore ...</p>
          </div>
        </div>

        <div className="flex-container related-services--container">
          {relatedServices.map((service: IService) => (
            <RelatedServicesCard service={service} key={service.id} />
          ))}
        </div>
        <div className="related-services--button">
          {!showMore && <Button alt={true} text="Show more" onClick={() => this.showMore()} />}
        </div>
      </section>
    );
  }
}

export default RelatedServices;
