import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../pages/Carregando';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.recoverFavoritas();
  }

  addFavoritas = async () => {
    const { checked } = this.state;
    this.setState({
      loading: true,
    });
    const { music } = this.props;
    if (checked) {
      await removeSong(music);
      this.setState({
        checked: false,
        loading: false,
      });
    } else {
      await addSong(music);
      this.setState({
        loading: false,
        checked: true,
      });
    }
  };

  recoverFavoritas = async () => {
    const musicas = await getFavoriteSongs();
    const { music } = this.props;
    if (musicas.some((musica) => musica.trackId === music.trackId)) {
      this.setState({
        checked: true,
      });
    }
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
  music: PropTypes.instanceOf(Object).isRequired,
};
export default MusicCard;
