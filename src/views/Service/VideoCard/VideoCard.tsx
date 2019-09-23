import React from 'react';
import ReactPlayer from 'react-player';

interface IProps {
  video: string;
  width: string;
}

const VideoCard: React.FunctionComponent<IProps> = ({ video, width }) => (
  <div className="flex-col flex-col--mobile--12 service__section">
    <ReactPlayer url={video} width={width} style={{ borderRadius: '19px' }} light={true} />
  </div>
);

export default VideoCard;
