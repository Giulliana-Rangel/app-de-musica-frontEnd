import React from 'react';
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
          </header>
        )}
      </div>
    );
  }
}
export default Header;
