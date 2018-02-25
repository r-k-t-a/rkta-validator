export default (validationResult, schema) =>
  validationResult.map((error) => {
    const property = error.dataPath.replace('.', '');
    const schemaProperty = schema.properties[property];
    const schemaMessage = schemaProperty.messages && schemaProperty.messages[error.keyword];
    return {
      error,
      property,
      message: schemaMessage || error.message,
    };
  });
