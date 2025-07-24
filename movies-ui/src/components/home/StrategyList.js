import React from 'react';
import { Card, Header, Segment } from 'semantic-ui-react';
import StrategyCard from './StrategyCard';

function StrategyList({ strategies }) {
  const cards = strategies.map((s) => (
    <StrategyCard key={s.strategyId} strategy={s} link />
  ));

  return strategies.length ? (
    <Card.Group doubling centered>
      {cards}
    </Card.Group>
  ) : (
    <Segment padded color="blue">
      <Header textAlign="center" as="h4">
        No strategies
      </Header>
    </Segment>
  );
}

export default StrategyList;
