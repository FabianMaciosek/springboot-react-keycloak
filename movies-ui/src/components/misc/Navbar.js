import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Dropdown, Menu } from 'semantic-ui-react';
import { isAdmin } from '../misc/Helpers';

function Navbar() {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const handleLogInOut = () => {
    if (keycloak.authenticated) {
      navigate('/');
      keycloak.logout();
    } else {
      keycloak.login();
    }
  };

  const getUsername = () => keycloak.authenticated && keycloak.tokenParsed?.preferred_username;
  const getLogInOutText = () => (keycloak.authenticated ? 'Logout' : 'Login');
  const adminStyle = isAdmin(keycloak) ? {} : { display: 'none' };

  return (
    <Menu stackable>
      <Container>
        <Menu.Item header>Strategy UI</Menu.Item>
        <Menu.Item as={NavLink} end to="/home">
          Home
        </Menu.Item>
        <Menu.Item as={NavLink} end to="/dashboard">
          Dashboard
        </Menu.Item>
        <Menu.Item as={NavLink} end to="/lean">
          Lean
        </Menu.Item>
        <Menu.Item as={NavLink} end to="/strategies-board">
          Strategies
        </Menu.Item>
        
        <Dropdown item text="Admin" style={adminStyle}>
          <Dropdown.Menu>
            <Dropdown.Item as={NavLink} end to="/strategies">
              Strategies
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} end to="/wizard">
              Strategy Wizard
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Menu position="right">
          {keycloak.authenticated && (
            <Dropdown text={`Hi ${getUsername()}`} pointing className="link item">
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/settings">
                  Settings
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          <Menu.Item as={NavLink} end to="/login" onClick={handleLogInOut}>
            {getLogInOutText()}
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default Navbar;
