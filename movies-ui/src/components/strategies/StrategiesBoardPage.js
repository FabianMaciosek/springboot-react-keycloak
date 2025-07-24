import React, { useEffect, useState } from 'react';
import { Container, Button, Card, Icon, Modal, Form } from 'semantic-ui-react';
import { strategiesApi } from '../misc/StrategiesApi';
import { handleLogError, isAdmin } from '../misc/Helpers';
import { useKeycloak } from '@react-keycloak/web';
import StrategyCard from '../home/StrategyCard';

const empty = { strategyId: '', name: '', author: '', version: '' };

function StrategiesBoardPage() {
  const { keycloak } = useKeycloak();
  const [strategies, setStrategies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(empty);

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

  /* ---------- add / edit ---------- */
  const save = async () => {
    try {
      await strategiesApi.saveStrategy(form, keycloak.token);
      setModalOpen(false);
      setForm(empty);
      fetchStrategies();
    } catch (e) {
      handleLogError(e);
    }
  };

  /* ---------- delete ---------- */
  const del = async (id) => {
    try {
      await strategiesApi.deleteStrategy(id, keycloak.token);
      fetchStrategies();
    } catch (e) {
      handleLogError(e);
    }
  };

  /* ---------- ui ---------- */
  const cards = strategies.map((s) => (
    <Card key={s.strategyId}>
      <StrategyCard strategy={s} link />
      {isAdmin(keycloak) && (
        <Card.Content extra>
          <Button icon size="mini" onClick={() => { setForm(s); setModalOpen(true); }}>
            <Icon name="edit" />
          </Button>
          <Button icon color="red" size="mini" onClick={() => del(s.strategyId)}>
            <Icon name="trash" />
          </Button>
        </Card.Content>
      )}
    </Card>
  ));

  return (
    <Container style={{ marginTop: '1em' }}>
      <Card.Group doubling centered>{cards}</Card.Group>

      {isAdmin(keycloak) && (
        <Button
          circular color="blue" icon="add"
          style={{ position: 'fixed', bottom: 25, right: 25 }}
          onClick={() => { setForm(empty); setModalOpen(true); }}
        />
      )}

      <Modal size="tiny" open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>{form.strategyId ? 'Edit strategy' : 'Add strategy'}</Modal.Header>
        <Modal.Content>
          <Form>
            {['strategyId', 'name', 'author', 'version'].map((f) => (
              <Form.Input
                key={f}
                label={f}
                value={form[f]}
                onChange={(_, { value }) => setForm((p) => ({ ...p, [f]: value }))}
              />
            ))}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={save}>Save</Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
}

export default StrategiesBoardPage;
