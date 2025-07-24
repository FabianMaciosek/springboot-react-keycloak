import React from 'react';
import { Form, Divider, Header } from 'semantic-ui-react';

/**
 * Very lightweight form.  Parent keeps state + handler.
 *
 * form = { startDate, endDate, initialCapital }
 */
function BacktestForm({ form, handleChange, handleRunBacktest }) {
  return (
    <>
      <Header as="h4">Back-test parameters</Header>
      <Divider />
      <Form onSubmit={handleRunBacktest}>
        <Form.Group widths="equal">
          <Form.Input
            id="startDate"
            type="date"
            label="Start Date"
            value={form.startDate}
            onChange={handleChange}
            required
          />
          <Form.Input
            id="endDate"
            type="date"
            label="End Date"
            value={form.endDate}
            onChange={handleChange}
            required
          />
          <Form.Input
            id="initialCapital"
            type="number"
            label="Initial Capital"
            placeholder="10000"
            value={form.initialCapital}
            onChange={handleChange}
            min={0}
            step={100}
            required
          />
        </Form.Group>
        <Form.Button
          content="Run Back-test"
          color="blue"
          disabled={!form.startDate || !form.endDate || !form.initialCapital}
        />
      </Form>
    </>
  );
}

export default BacktestForm;
