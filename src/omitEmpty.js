import omitBy from 'lodash.omitby';

const ignoredValues = ['', null, undefined, NaN];
const makeOmitPredicate = ignored => value =>
  ignoredValues.concat(ignored).indexOf(value) !== -1;

export default (form, ignored) => omitBy(form, makeOmitPredicate(ignored));
