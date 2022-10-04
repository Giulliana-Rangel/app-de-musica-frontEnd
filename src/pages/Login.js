import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor(props) { // criando o estado para controlar input/btn
    super(props);

    this.state = { // o estado sempre recebe um obj - estado inicial
      loginNameInput: '',
      isSaveBtnDisable: true,
      loading: false,
      redirect: false,
    };
  }

  validationBtn = () => { // verificar se o inputName tem mais de 3 caracteres
    const TRES = 3;
    const { loginNameInput } = this.state;
    const maisQueTres = loginNameInput.length >= TRES;
    this.setState({ isSaveBtnDisable: !maisQueTres });
  };

  handleChange = ({ target }) => { // função genérica
    // console.log(target);
    this.setState({
      [target.name]: target.value,
    }, () => this.validationBtn());
  };

  onButtonClick = async () => { // carregando e redirecionando
    const { loginNameInput } = this.state;
    const objLoginNameInput = { name: loginNameInput };
    this.setState({ loading: true });

    await createUser(objLoginNameInput); // createUser recebe um obj
    this.setState({ redirect: true });
  };

  render() {
    const { loginNameInput, isSaveBtnDisable, loading, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/search" />;
    }

    return (
      <div data-testid="page-login">
        {loading ? (<Carregando />) : (
          <form>
            <label htmlFor="loginNameInput">
              Name:
              <input
                type="text"
                name="loginNameInput"
                data-testid="login-name-input"
                value={ loginNameInput }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              name="loginSubmitButton"
              data-testid="login-submit-button"
              onClick={ this.onButtonClick }
              disabled={ isSaveBtnDisable }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
