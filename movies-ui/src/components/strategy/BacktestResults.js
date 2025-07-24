import React from 'react';
import { Segment, Header, Table } from 'semantic-ui-react';

/**
 * Shows placeholder results until BE returns real numbers.
 *
 * results example:
 * {
 *   totalReturn: '12.5%',
 *   maxDrawdown: '-4.1%',
 *   trades: [
 *     { date: '2023-01-03', action: 'BUY', price: 101.23 },
 *     ...
 *   ]
 * }
 */
function BacktestResults({ results }) {
  if (!results) {
    return (
      <Segment placeholder>
        <Header icon>Run a back-test to see results</Header>
      </Segment>
    );
  }

  const tradeRows =
    results.trades?.map((t, i) => (
      <Table.Row key={i}>
        <Table.Cell>{t.date}</Table.Cell>
        <Table.Cell>{t.action}</Table.Cell>
        <Table.Cell>{t.price}</Table.Cell>
      </Table.Row>
    )) || null;

  return (
    <Segment>
      <Header as="h4">Results</Header>
      <p>
        <strong>Total Return:</strong> {results.totalReturn}
        <br />
        <strong>Max Drawdown:</strong> {results.maxDrawdown}
      </p>

      {tradeRows && (
        <Table compact striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{tradeRows}</Table.Body>
        </Table>
      )}
    </Segment>
  );
}

export default BacktestResults;
