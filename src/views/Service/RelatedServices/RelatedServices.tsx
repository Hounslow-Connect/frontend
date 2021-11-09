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
        <div className="flex-container flex-container--justify-between flex-container--align-center">
          <div className="flex-col flex-col--mobile--12">
            <h2>Other results you might be interested in</h2>
          </div>
          <div className="flex-col flex-col--mobile--12">
            {!showMore && (
              <Button text="View more related services" onClick={() => this.showMore()} />
            )}
          </div>
        </div>

        <div className="flex-container">
          <div className="related-services__container">
            {relatedServices.map((service: IService) => (
              <RelatedServicesCard service={service} key={service.id} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default RelatedServices;
