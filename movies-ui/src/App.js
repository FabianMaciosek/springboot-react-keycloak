import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/home/Home';
import StrategyDetail from './components/strategy/StrategyDetail';
import StrategiesPage from './components/strategies/StrategiesPage';
import StrategyWizard from './components/wizard/StrategyWizard';
import DashboardPage from './components/dashboard/DashboardPage';
import Navbar from './components/misc/Navbar';
import PrivateRoute from './components/misc/PrivateRoute';
import LeanPage from './components/lean/LeanPage';
import StrategiesBoardPage from './components/strategies/StrategiesBoardPage';

import { Dimmer, Header, Icon } from 'semantic-ui-react';
import { config } from './Constants';
import UserSettings     from './components/settings/UserSettings'; 

function App() {
  const keycloak = new Keycloak({
    url: `${config.url.KEYCLOAK_BASE_URL}`,
    realm: 'company-services',
    clientId: 'movies-app' // unchanged – same KC client
  });

  const initOptions = { pkceMethod: 'S256' };

  const loadingComponent = (
    <Dimmer inverted active page>
      <Header style={{ color: '#4d4d4d' }} as="h2" icon inverted>
        <Icon loading name="cog" />
        <Header.Content>
          Keycloak is loading
          <Header.Subheader style={{ color: '#4d4d4d' }}>
            or running authorization code flow with PKCE
          </Header.Subheader>
        </Header.Content>
      </Header>
    </Dimmer>
  );

  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions} LoadingComponent={loadingComponent}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* public strategy detail */}
          <Route path="/strategies/:id" element={<StrategyDetail />} />

          {/* authenticated routes */}
          <Route
            path="/strategies"
            element={
              <PrivateRoute>
                <StrategiesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/wizard"
            element={
              <PrivateRoute>
                <StrategyWizard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <UserSettings />
              </PrivateRoute>
            }
          />
          <Route 
            path="/lean" 
            element={
              <LeanPage />
            } 
          />
          <Route 
            path="/strategies-board" 
            element={
              <StrategiesBoardPage />
            } 
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ReactKeycloakProvider>
  );
}

export default App;
