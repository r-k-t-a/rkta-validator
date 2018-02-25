# Why?
To validate react forms declaratively.

## What
A factory on top of [ajv](https://github.com/epoberezkin/ajv#readme).

## How
```
import makeValidator from 'rkta-validator';
import schema from './schema.json';

const validate = makeValidator(schema);

/* ----- */
validate(form);
```

## Schema
1. Validator expects form to have 1 dimension.
2. Schema can be generated
3. Schema is extended with `messages` prop for each property.

Example of generated schema:
```
// Validator will pass a form to schema func
export default form => ({
  type: 'object',
  properties: {
    text: {
      type: 'string',
      messages: {
        type: 'Should be a string',
        required: 'Please enter a text',
      },
    },
    minimum: {
      type: 'integer',
      // form data can be used to set schema props explicitly
      maximum: form.maximum,
      minimum: 0,
      messages: {
        type: 'Should be a zero or more',
        minimum: 'Should exceed 0',
      },
    },
    maximum: {
      default: null,
      type: ['integer', 'null'],
      minimum: { $data: '1/minimum' },
      // Messages key is not a part of json.org spec,
      // but it is very useful in real life
      messages: {
        type: 'Should be a zero or more',
        minimum: `Should exceed ${form.minimum || 0}`,
      },
    },
  },
  required: ['text', 'minimum'],
});
```

## What else?
See: [rkta-form](https://github.com/r-k-t-a/rkta-form.git)
