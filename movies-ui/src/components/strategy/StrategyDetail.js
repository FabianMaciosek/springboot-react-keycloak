import React, { useEffect, useState } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import StrategyCard from '../home/StrategyCard';
import BacktestForm from './BacktestForm';
import BacktestResults from './BacktestResults';

import { strategiesApi } from '../misc/StrategiesApi';
import { handleLogError } from '../misc/Helpers';

function StrategyDetail() {
  const { id } = useParams();                // strategyId from URL
  const [strategy, setStrategy] = useState(null);

  // back-test form state
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    initialCapital: ''
  });

  const [results, setResults] = useState(null);

  // fetch strategy meta
  useEffect(() => {
    const fetchStrategy = async () => {
      try {
        const response = await strategiesApi.getStrategy(id);
        setStrategy(response.data);
      } catch (error) {
        handleLogError(error);
      }
    };
    fetchStrategy();
  }, [id]);

  // generic change handler
  const handleChange = (e) => {
    const { id: field, value } = e.target;
    setForm((f) => ({ ...f, [field]: value }));
  };

  /**
   * Dummy “run” – in reality this would POST to `/backtests`
   * and await a payload.  Here we just fabricate numbers.
   */
  const handleRunBacktest = async () => {
    // eslint-disable-next-line no-console
    console.log('Pretend we called BE with', form);

    // simple placeholder result
    const fake = {
      totalReturn: '12.5%',
      maxDrawdown: '-4.1%',
      trades: [
        { date: form.startDate, action: 'BUY', price: 100 },
        { date: form.endDate, action: 'SELL', price: 112.5 }
      ]
    };
    setResults(fake);
  };

  if (!strategy) return null;

  return (
    <Container>
      <Grid columns={2} stackable>
        <Grid.Row>
          <Grid.Column width={5}>
            <StrategyCard strategy={strategy} link={false} />
          </Grid.Column>
          <Grid.Column width={11}>
            <BacktestForm
              form={form}
              handleChange={handleChange}
              handleRunBacktest={handleRunBacktest}
            />
            <BacktestResults results={results} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default StrategyDetail;
