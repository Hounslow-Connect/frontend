import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy';

interface IProps {
  video: string;
  width: string;
}

const VideoCard: React.FunctionComponent<IProps> = ({ video, width }) => {
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false)

  return (
    <div className="flex-col flex-col--mobile--12 service__section">
      <ReactPlayer 
      url={video} 
      width={width} 
      style={{ borderRadius: '19px' }} 
      light={true} 
      controls
      onClickPreview={() => setVideoPlaying(true)}
      playing={videoPlaying}
      />
    </div>
  )
}

export default VideoCard;
