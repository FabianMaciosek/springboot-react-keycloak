import React, { useState } from 'react';
import { Button, Container, Divider, Grid, Icon, Step } from 'semantic-ui-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import { strategiesApi } from '../misc/StrategiesApi';
import { handleLogError, isAdmin } from '../misc/Helpers';

import SearchStep from './SearchStep';
import FormStep from './FormStep';
import CompleteStep from './CompleteStep';

/* ---------------- initial states ---------------- */
const errorsInitial = { id: false, name: false, author: false, version: false };

function StrategyWizard() {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  /* ------------- wizard navigation --------------- */
  const [step, setStep] = useState(1);

  /* ------------- search step --------------------- */
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [strategies, setStrategies] = useState([]);
  const [selected, setSelected] = useState(null);

  /* ------------- form step ----------------------- */
  const [strategyId, setStrategyId] = useState('');
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [version, setVersion] = useState('');
  const [errors, setErrors] = useState(errorsInitial);

  /* ---------------- handlers --------------------- */
  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'searchText':
        setSearchText(value);
        break;
      case 'strategyId':
        setStrategyId(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'author':
        setAuthor(value);
        break;
      case 'version':
        setVersion(value);
        break;
      default:
        break;
    }
  };

  /* ----------- search / select ------------------- */
  const handleSearch = async () => {
    try {
      setIsLoading(true);
      // Placeholder: pretend API returns a single strategy for demo
      setStrategies([
        {
          strategyId: `LIB-${searchText.toUpperCase()}`,
          name: `Library Strategy: ${searchText}`,
          author: 'lib-author',
          version: '1.0'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (s) => {
    if (selected && s.strategyId === selected.strategyId) {
      setSelected(null);
      setStrategyId('');
      setName('');
      setAuthor('');
      setVersion('');
    } else {
      setSelected(s);
      setStrategyId(s.strategyId);
      setName(s.name);
      setAuthor(s.author);
      setVersion(s.version);
    }
  };

  /* ---------------- form validate ---------------- */
  const validForm = () => {
    const err = {
      id: strategyId.trim() === '',
      name: name.trim() === '',
      author: author.trim() === '',
      version: version.trim() === ''
    };
    setErrors(err);
    return !Object.values(err).some(Boolean);
  };

  /* -------------- step navigation ---------------- */
  const prev = () => {
    if (step === 2) setErrors(errorsInitial);
    setStep((s) => Math.max(1, s - 1));
  };
  const next = () => {
    if (step === 2 && !validForm()) return;
    setStep((s) => Math.min(3, s + 1));
  };

  /* -------------- create strategy ---------------- */
  const createStrategy = async () => {
    try {
      await strategiesApi.saveStrategy(
        { strategyId, name, author, version },
        keycloak.token
      );
      navigate('/home');
    } catch (e) {
      handleLogError(e);
    }
  };

  /* ---------------- content by step -------------- */
  const stepContent = {
    1: (
      <SearchStep
        searchText={searchText}
        isLoading={isLoading}
        strategies={strategies}
        selectedStrategy={selected}
        handleChange={handleChange}
        handleSearch={handleSearch}
        handleSelect={handleSelect}
      />
    ),
    2: (
      <FormStep
        strategyId={strategyId}
        name={name}
        author={author}
        version={version}
        errors={errors}
        handleChange={handleChange}
      />
    ),
    3: <CompleteStep strategy={{ strategyId, name, author, version }} />
  }[step];

  /* ------------------------ render ------------------------ */
  if (!keycloak.authenticated || !isAdmin(keycloak)) return <Navigate to="/" />;

  return (
    <Container>
      <Grid columns={2}>
        <Grid.Column mobile={16} tablet={4} computer={4}>
          <Step.Group fluid vertical>
            <Step active={step === 1}>
              <Icon name="search" />
              <Step.Content>
                <Step.Title>Search</Step.Title>
                <Step.Description>Library lookup</Step.Description>
              </Step.Content>
            </Step>
            <Step active={step === 2}>
              <Icon name="lab" />
              <Step.Content>
                <Step.Title>Strategy</Step.Title>
                <Step.Description>Details</Step.Description>
              </Step.Content>
            </Step>
            <Step active={step === 3}>
              <Icon name="flag checkered" />
              <Step.Content>
                <Step.Title>Complete</Step.Title>
                <Step.Description>Preview &amp; save</Step.Description>
              </Step.Content>
            </Step>
          </Step.Group>

          <Button.Group fluid>
            <Button disabled={step === 1} onClick={prev}>
              Back
            </Button>
            <Button.Or />
            <Button positive disabled={step === 3} onClick={next}>
              Next
            </Button>
          </Button.Group>

          {step === 3 && (
            <>
              <Divider />
              <Button fluid color="blue" onClick={createStrategy}>
                Create
              </Button>
            </>
          )}
        </Grid.Column>

        <Grid.Column mobile={16} tablet={12} computer={12}>
          {stepContent}
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default StrategyWizard;
