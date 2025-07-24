import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

function FormStep({ strategyId, name, author, version, errors, handleChange }) {
  return (
    <Segment>
      <Form>
        <Form.Input id="strategyId" label="Strategy ID" value={strategyId} onChange={handleChange} error={errors.id} />
        <Form.Input id="name" label="Name" value={name} onChange={handleChange} error={errors.name} />
        <Form.Input id="author" label="Author" value={author} onChange={handleChange} error={errors.author} />
        <Form.Input id="version" label="Version" value={version} onChange={handleChange} error={errors.version} />
      </Form>
    </Segment>
  );
}

export default FormStep;
