import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bandName: '',
      isSaveBtnDisable: true,
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

  render() {
    const { bandName, isSaveBtnDisable } = this.state;

    return (
      <main>
        <div data-testid="page-search">
          <Header />
        </div>
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
            onClick={ () => console.log('clicou') }
            disabled={ isSaveBtnDisable }
          >
            Pesquisar
          </button>
        </form>
      </main>
    );
  }
}

export default Search;
