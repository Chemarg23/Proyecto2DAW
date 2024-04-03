import PropTypes from 'prop-types';
import { baseUrl } from "../services/Service";

const VideoPlayer = ({ episode }) => {
  return (
    <div className="video-player-wrapper rounded-lg">
      <video
        src={`${baseUrl}stream/${episode.videoPath}`}
        controls={true}
        width="100%"
        height="100%"
        className="rounded-lg"
      />
    </div>
  );
};

VideoPlayer.propTypes = {
  episode: PropTypes.shape({
    videoPath: PropTypes.string.isRequired,
  }).isRequired,
};
export default VideoPlayer;
