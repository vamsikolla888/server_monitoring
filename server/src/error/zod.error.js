
/**
 * Format Zod error messages into a single string with better readability
 */
export const formatZodError = (error) => {
  const errorMap = {
    invalid_type: (err) => `${err.path.join('.')}: Expected ${err.expected}, received ${err.received}`,
    invalid_string: (err) => `${err.path.join('.')}: Invalid string value`,
    too_small: (err) => `${err.path.join('.')}: Must be ${err.exact ? 'exactly' : 'at least'} ${err.minimum} character${err.minimum === 1 ? '' : 's'}`,
    too_big: (err) => `${err.path.join('.')}: Must be ${err.exact ? 'exactly' : 'at most'} ${err.maximum} character${err.maximum === 1 ? '' : 's'}`,
    invalid_enum_value: (err) => `${err.path.join('.')}: Invalid value. Expected one of: ${err.options.join(', ')}`,
    invalid_arguments: (err) => `${err.path.join('.')}: Invalid arguments provided`,
    invalid_return_type: (err) => `${err.path.join('.')}: Invalid return type`,
    invalid_date: (err) => `${err.path.join('.')}: Invalid date`,
    invalid_intersection_types: (err) => `${err.path.join('.')}: Intersection types are invalid`,
    not_multiple_of: (err) => `${err.path.join('.')}: Must be a multiple of ${err.multipleOf}`,
    not_finite: (err) => `${err.path.join('.')}: Number must be finite`,
    custom: (err) => `${err.path.length ? `${err.path.join('.')}: ` : ''}${err.message}`
  };

  return error.errors.map(err => {
    const formatter = errorMap[err.code] || (err => `${err.path.join('.')}: ${err.message}`);
    return formatter(err);
  }).join('; ');
};