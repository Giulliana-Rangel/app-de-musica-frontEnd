import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bandName: '',
      isSaveBtnDisable: true,
      loading: false,
      albums: [],
      teste: '',
    };
  }

  validationBtn = () => { // verificar se o inputName tem mais de 2 caracteres
    const DOIS = 2;
    const { bandName } = this.state;
    const maisQueDois = bandName.length >= DOIS;
    this.setState({ isSaveBtnDisable: !maisQueDois });
  };

  handleChange = ({ target }) => { // função genérica
    // console.log(target);
    this.setState({
      [target.name]: target.value,
    }, () => this.validationBtn());
  };

  fetchAlbumAPI = async () => {
    const { bandName } = this.state;
    this.setState({ loading: true });
    const albums = await searchAlbumsAPI(bandName);
    // console.log(albums);
    this.setState({ albums, bandName: '', loading: false, teste: bandName });
  };

  render() {
    const { bandName, isSaveBtnDisable, loading, albums, teste } = this.state;
    return (
      <div data-testid="page-search">
        <Header />

        <form>
          <label htmlFor="bandName">
            <input
              type="text"
              data-testid="search-artist-input"
              name="bandName"
              value={ bandName }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            name="btnBand"
            onClick={ this.fetchAlbumAPI }
            disabled={ isSaveBtnDisable }
          >
            Pesquisar
          </button>
        </form>

        { loading ? <Carregando /> : (
          <>
            <h3>{`Resultado de álbuns de: ${teste}`}</h3>
            <div className="albuns">
              { albums.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
                albums.map((album) => (
                  <div key={ album.collectionId }>
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <p>{ album.collectionName }</p>
                    <p>{ album.artistName }</p>
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      Ver detalhes
                    </Link>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Search;
