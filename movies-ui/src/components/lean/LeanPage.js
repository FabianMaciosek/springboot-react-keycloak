import React, { useEffect, useState } from 'react';
import { Container, Dropdown, Button, Segment } from 'semantic-ui-react';
import { strategiesApi } from '../misc/StrategiesApi';
import { backtestApi } from '../misc/BacktestApi';
import { handleLogError } from '../misc/Helpers';
import LeanStats from './LeanStats';

function LeanPage() {
  const [strategies, setStrategies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await strategiesApi.getStrategies();
        setStrategies(resp.data);
      } catch (e) {
        handleLogError(e);
      }
    })();
  }, []);

  const options = strategies.map((s) => ({
    key: s.strategyId,
    value: s.strategyId,
    text: s.name
  }));

  const runBacktest = async () => {
    try {
      const resp = await backtestApi.getBacktest(selected);
      setStats(resp.data.tradeStatistics);
    } catch (e) {
      handleLogError(e);
    }
  };

  return (
    <Container style={{ marginTop: '1em' }}>
      <Segment>
        <Dropdown
          placeholder="Select strategy"
          fluid
          search
          selection
          options={options}
          onChange={(_, { value }) => setSelected(value)}
          value={selected}
        />
        {selected && (
          <Button color="blue" fluid style={{ marginTop: '1em' }} onClick={runBacktest}>
            Backtest
          </Button>
        )}
      </Segment>

      <LeanStats stats={stats} />
    </Container>
  );
}

export default LeanPage;
