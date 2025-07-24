import React, { useEffect, useState } from 'react';
import { Container, Header, Segment, Dropdown } from 'semantic-ui-react';
import { strategiesApi } from '../misc/StrategiesApi';
import { handleLogError } from '../misc/Helpers';

import BacktestForm from '../strategy/BacktestForm';
import BacktestResults from '../strategy/BacktestResults';

function DashboardPage() {
  const [strategies, setStrategies] = useState([]);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({ startDate: '', endDate: '', initialCapital: '' });
  const [results, setResults] = useState(null);

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

  const handleSelect = (e, { value }) => {
    const strat = strategies.find((s) => s.strategyId === value);
    setSelected(strat);
    setResults(null);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const runBacktest = () =>
    setResults({
      totalReturn: '8.9%',
      maxDrawdown: '-3.2%',
      trades: [{ date: form.startDate, action: 'BUY', price: 100 }, { date: form.endDate, action: 'SELL', price: 108.9 }]
    });

  const options = strategies.map((s) => ({ key: s.strategyId, value: s.strategyId, text: s.name }));

  return (
    <Container>
      <Header as="h2" dividing>
        Back-test Dashboard
      </Header>

      <Segment>
        <Dropdown
          placeholder="Select strategy"
          fluid
          search
          selection
          options={options}
          onChange={handleSelect}
          value={selected?.strategyId}
        />
        {selected && (
          <BacktestForm form={form} handleChange={handleChange} handleRunBacktest={runBacktest} />
        )}
      </Segment>

      <BacktestResults results={results} />
    </Container>
  );
}

export default DashboardPage;
