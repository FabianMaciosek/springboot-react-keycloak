import React from 'react';
import { Button, Form } from 'semantic-ui-react';

function StrategiesForm({ form, handleChange, handleSaveStrategy, clearForm }) {
  return (
    <Form>
      <Form.Input
        fluid
        label="Strategy ID *"
        id="strategyId"
        onChange={handleChange}
        value={form.strategyId}
        error={form.strategyIdError}
      />
      <Form.Input
        fluid
        label="Name *"
        id="name"
        onChange={handleChange}
        value={form.name}
        error={form.nameError}
      />
      <Form.Input
        fluid
        label="Author *"
        id="author"
        onChange={handleChange}
        value={form.author}
        error={form.authorError}
      />
      <Form.Input
        fluid
        label="Version *"
        id="version"
        onChange={handleChange}
        value={form.version}
        error={form.versionError}
      />
      <Button.Group fluid>
        <Button onClick={clearForm}>Cancel</Button>
        <Button.Or />
        <Button positive onClick={handleSaveStrategy}>
          Save
        </Button>
      </Button.Group>
    </Form>
  );
}

export default StrategiesForm;
