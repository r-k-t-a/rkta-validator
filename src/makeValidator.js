import Ajv from 'ajv';
import keywords from 'ajv-keywords';

import humanizeErrors from './humanizeErrors';
import omitEmpty from './omitEmpty';
import mergeErrors from './mergeErrors';

export default (schema, options) =>
  (form, inputName, prevErrors) => {
    const defaultOptions = {
      allErrors: true,
      $data: true,
      errorDataPath: 'property',
      format: 'full',
      useDefaults: true,
      v5: true,
    };
    const ajv = new Ajv({ ...defaultOptions, ...options });
    keywords(ajv);
    const schemaAsObject = typeof schema === 'function'
      ? schema(form, inputName, prevErrors)
      : schema;

    const validate = ajv.compile(schemaAsObject);
    const nextData = omitEmpty(form);
    const valid = validate(nextData);

    if (valid) return Promise.resolve(nextData);

    const currentErrors = humanizeErrors(validate.errors, schemaAsObject);
    const finalErrors = inputName
      ? mergeErrors(prevErrors, currentErrors, inputName)
      : currentErrors;

    return finalErrors.length > 0 ? Promise.reject(finalErrors) : Promise.resolve(nextData);
  };
