import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/**
 * Generic card that shows basic strategy info.
 * If `link` is true, clicking the card navigates to `/strategies/:id`.
 */
function StrategyCard({ strategy, link = false }) {
  const content = (
    <>
      <Card.Content textAlign="center">
        <Card.Header>{strategy.name}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          ID:&nbsp;<strong>{strategy.strategyId}</strong>
        </Card.Description>
        <Card.Description>
          Author:&nbsp;<strong>{strategy.author}</strong>
        </Card.Description>
        <Card.Description>
          Version:&nbsp;<strong>{strategy.version}</strong>
        </Card.Description>
      </Card.Content>
    </>
  );

  return link ? (
    <Card as={Link} to={`/strategies/${strategy.strategyId}`}>
      {content}
    </Card>
  ) : (
    <Card>{content}</Card>
  );
}

export default StrategyCard;
