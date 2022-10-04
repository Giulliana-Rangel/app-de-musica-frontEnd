import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

class Header extends React.Component {
  state = {
    loading: true,
    loginName: '',
  };

  async componentDidMount() {
    const loginName = await getUser();
    this.setState({
      loading: false,
      loginName: loginName.name,
    });
  }

  render() {
    const { loading, loginName } = this.state;

    return (
      <div>
        {loading ? (
          <Carregando />
        ) : (
          <header data-testid="header-component">
            <h3 data-testid="header-user-name">
              { loginName }
            </h3>
            <nav>
              <ul>
                <li>
                  <Link to="/search" data-testid="link-to-search">
                    Search
                  </Link>
                </li>
                <li>
                  <Link to="/favorites" data-testid="link-to-favorites">
                    Favoritas
                  </Link>

                </li>
                <li>
                  <Link to="/profile" data-testid="link-to-profile">
                    Perfil
                  </Link>

                </li>
              </ul>

            </nav>
          </header>
        )}
      </div>
    );
  }
}
export default Header;
