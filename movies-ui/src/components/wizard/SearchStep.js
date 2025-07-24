import React from 'react';
import { Form, Segment, Table } from 'semantic-ui-react';

function SearchStep({ searchText, isLoading, strategies, selectedStrategy, handleChange, handleSearch, handleSelect }) {
  const rows = strategies.length
    ? strategies.map((s) => {
        const active = selectedStrategy && s.strategyId === selectedStrategy.strategyId;
        return (
          <Table.Row key={s.strategyId} active={active} onClick={() => handleSelect(s)}>
            <Table.Cell>{s.strategyId}</Table.Cell>
            <Table.Cell>{s.name}</Table.Cell>
            <Table.Cell>{s.author}</Table.Cell>
            <Table.Cell>{s.version}</Table.Cell>
          </Table.Row>
        );
      })
    : null;

  return (
    <Segment loading={isLoading}>
      <Form onSubmit={handleSearch}>
        <Form.Group unstackable>
          <Form.Input
            fluid
            width={12}
            id="searchText"
            placeholder="Search strategy by name ..."
            value={searchText}
            onChange={handleChange}
          />
          <Form.Button
            fluid
            width={4}
            color="blue"
            content="Search"
            disabled={searchText.trim() === ''}
          />
        </Form.Group>
      </Form>

      <Table compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Version</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table>
    </Segment>
  );
}

export default SearchStep;
