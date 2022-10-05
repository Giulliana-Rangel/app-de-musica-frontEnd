import React from 'react';
import PropTypes from 'prop-types';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    const { trackName } = this.props;
    const { loading } = this.state;

    return (
      <div>
        { loading ? <Carregando />
          : (
            <>
              <p>{ trackName }</p>
              <audio data-testid="audio-component" src="{previewUrl}" controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
            </>
          )}
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
};
export default MusicCard;
