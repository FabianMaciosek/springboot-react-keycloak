import React from 'react';
import { Card } from 'semantic-ui-react';
import StrategyCard from '../home/StrategyCard';

function CompleteStep({ strategy }) {
  return (
    <Card.Group doubling centered>
      <StrategyCard strategy={strategy} link={false} />
    </Card.Group>
  );
}

export default CompleteStep;
