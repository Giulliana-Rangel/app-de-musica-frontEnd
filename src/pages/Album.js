import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: [], // lista de musica do album
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchMusicList();
  }

  fetchMusicList = async () => { // requisição
    const { match: { params: { id } } } = this.props; // a func getMuscis recebe uma string com id
    const albumAPI = await getMusics(id);
    this.setState({
      musicList: albumAPI, // alterei o estado inicial
      loading: false,
    });
  };

  render() {
    const { musicList, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Carregando />
          : (
            <div>
              <p data-testid="artist-name">
                { musicList[0].artistName }
              </p>
              <p data-testid="album-name">
                { musicList[0].collectionName }
              </p>
              <ol>
                { musicList.map((music, index) => {
                  if (index > 0) {
                    return (<MusicCard
                      key={ index }
                      { ...music }
                    />);
                  }
                  return null;
                })}
              </ol>
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default Album;
