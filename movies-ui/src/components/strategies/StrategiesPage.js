import React, { useEffect, useState } from 'react';
import { Container, Grid, Header, Segment, Icon, Divider } from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import { strategiesApi } from '../misc/StrategiesApi';
import { handleLogError, isAdmin } from '../misc/Helpers';

import StrategiesForm from './StrategiesForm';
import StrategiesTable from './StrategiesTable';
import ConfirmationModal from '../misc/ConfirmationModal';

/* ---------- local state helpers ----------------- */
const formInitial = {
  strategyId: '',
  name: '',
  author: '',
  version: '',

  strategyIdError: false,
  nameError: false,
  authorError: false,
  versionError: false
};
const modalInitial = { isOpen: false, header: '', content: '', onAction: null, onClose: null };

function StrategiesPage() {
  const { keycloak } = useKeycloak();

  const [strategies, setStrategies] = useState([]);
  const [form, setForm] = useState({ ...formInitial });
  const [modal, setModal] = useState({ ...modalInitial });
  const [strategyToDelete, setStrategyToDelete] = useState(null);

  /* ------------------- fetch -------------------- */
  const fetchStrategies = async () => {
    try {
      const resp = await strategiesApi.getStrategies();
      setStrategies(resp.data);
    } catch (e) {
      handleLogError(e);
    }
  };

  useEffect(() => {
    fetchStrategies();
  }, []);

  /* ------------------- form -------------------- */
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const isValid = () => {
    const errors = {
      strategyIdError: form.strategyId.trim() === '',
      nameError: form.name.trim() === '',
      authorError: form.author.trim() === '',
      versionError: form.version.trim() === ''
    };
    setForm((f) => ({ ...f, ...errors }));
    return !Object.values(errors).some(Boolean);
  };

  const clearForm = () => setForm({ ...formInitial });

  const handleSaveStrategy = async () => {
    if (!isValid()) return;
    const { strategyId, name, author, version } = form;
    try {
      await strategiesApi.saveStrategy({ strategyId, name, author, version }, keycloak.token);
      clearForm();
      fetchStrategies();
    } catch (e) {
      handleLogError(e);
    }
  };

  /* ------------------- delete -------------------- */
  const askDelete = (strategy) => {
    setStrategyToDelete(strategy);
    setModal({
      isOpen: true,
      header: 'Delete Strategy',
      content: `Delete strategy '${strategy.name}'?`,
      onAction: handleModalAction,
      onClose: closeModal
    });
  };

  const handleModalAction = async (confirm) => {
    if (confirm && strategyToDelete) {
      try {
        await strategiesApi.deleteStrategy(strategyToDelete.strategyId, keycloak.token);
        fetchStrategies();
      } catch (e) {
        handleLogError(e);
      }
    }
    closeModal();
  };

  const closeModal = () => {
    setModal({ ...modalInitial });
    setStrategyToDelete(null);
  };

  /* ------------------- edit -------------------- */
  const handleEdit = (s) =>
    setForm({
      strategyId: s.strategyId,
      name: s.name,
      author: s.author,
      version: s.version,
      strategyIdError: false,
      nameError: false,
      authorError: false,
      versionError: false
    });

  /* ------------------- render -------------------- */
  if (!isAdmin(keycloak)) return <Navigate to="/" />;

  return (
    <Container>
      <Grid>
        <Grid.Column mobile={16} tablet={16} computer={4}>
          <Segment>
            <Header as="h2">
              <Icon name="lab" />
              <Header.Content>Strategies</Header.Content>
            </Header>
            <Divider />
            <StrategiesForm
              form={form}
              handleChange={handleChange}
              handleSaveStrategy={handleSaveStrategy}
              clearForm={clearForm}
            />
          </Segment>
        </Grid.Column>

        <Grid.Column mobile={16} tablet={16} computer={12}>
          <StrategiesTable strategies={strategies} handleDeleteStrategy={askDelete} handleEditStrategy={handleEdit} />
        </Grid.Column>
      </Grid>

      <ConfirmationModal modal={modal} movie={strategyToDelete} />
    </Container>
  );
}

export default StrategiesPage;
