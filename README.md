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

Generated schema example:
<script src="https://gist.github.com/droganov/461087e71a1c35e8aeb39140d4b24d61.js"></script>

## What else?
See: [rkta-form](https://github.com/r-k-t-a/rkta-form.git)
