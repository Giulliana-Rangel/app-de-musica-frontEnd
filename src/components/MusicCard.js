import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../pages/Carregando';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    checked: false,
    loading: false,
  };

  addFavoritas = async () => {
    this.setState({
      loading: true,
    });
    await addSong();
    this.setState({
      loading: false,
      checked: true,
    });
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { checked, loading } = this.state;
    if (loading) {
      return <Carregando />;
    }

    return (
      <div>
        <p>{trackName}</p>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favoriteMusic">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favoriteMusic"
            checked={ checked }
            onChange={ this.addFavoritas }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
export default MusicCard;
