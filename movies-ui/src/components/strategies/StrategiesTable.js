import React from 'react';
import { Button, Table } from 'semantic-ui-react';

function StrategiesTable({ strategies, handleDeleteStrategy, handleEditStrategy }) {
  const height = window.innerHeight - 100;
  const style = { height, maxHeight: height, overflowY: 'auto', overflowX: 'hidden' };

  const rows =
    strategies?.map((s) => (
      <Table.Row key={s.strategyId}>
        <Table.Cell collapsing>
          <Button circular color="red" size="small" icon="trash" onClick={() => handleDeleteStrategy(s)} />
          <Button circular color="orange" size="small" icon="edit" onClick={() => handleEditStrategy(s)} />
        </Table.Cell>
        <Table.Cell>{s.strategyId}</Table.Cell>
        <Table.Cell>{s.name}</Table.Cell>
        <Table.Cell>{s.author}</Table.Cell>
        <Table.Cell>{s.version}</Table.Cell>
      </Table.Row>
    )) || null;

  return (
    <div style={style}>
      <Table compact striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2} />
            <Table.HeaderCell width={3}>ID</Table.HeaderCell>
            <Table.HeaderCell width={5}>Name</Table.HeaderCell>
            <Table.HeaderCell width={3}>Author</Table.HeaderCell>
            <Table.HeaderCell width={3}>Version</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table>
    </div>
  );
}

export default StrategiesTable;
