const filterNonInputErrors = (errors, inputName) =>
  errors.filter(error => error.property !== inputName);

const filterInputErrors = (errors, inputName) =>
  errors.filter(error => error.property === inputName);

export default (oldErrors, nextErrors, inputName) => [
  ...filterNonInputErrors(oldErrors, inputName),
  ...filterInputErrors(nextErrors, inputName),
];
