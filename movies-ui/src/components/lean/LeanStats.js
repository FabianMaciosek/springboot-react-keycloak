import React from 'react';
import { Segment, Table, Header } from 'semantic-ui-react';

function LeanStats({ stats }) {
  if (!stats) return null;

  const rows = Object.entries(stats).map(([k, v]) => (
    <Table.Row key={k}>
      <Table.Cell>{k}</Table.Cell>
      <Table.Cell>{String(v)}</Table.Cell>
    </Table.Row>
  ));

  return (
    <Segment>
      <Header as="h4">Trade Statistics</Header>
      <Table compact definition>
        <Table.Body>{rows}</Table.Body>
      </Table>
    </Segment>
  );
}

export default LeanStats;
