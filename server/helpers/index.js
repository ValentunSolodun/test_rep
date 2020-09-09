const {_} = require('lodash');

const generateQueryWithFilter = (query, filter, separator = 'and') => {
  if (_.isEmpty(filter)) return query;
  if (!query) return '';
  const createdFilterPartOfQuery =
    _.join(_.map(_.toPairs(filter), (p) => `${p[0]} = '${p[1]}'`), ` ${separator} `);
  return `${query} where ${createdFilterPartOfQuery}`;
};

const generateQueryWithOrder = (query, order) => {
  if (_.isEmpty(order)) return query;
  if (!query) return '';
  const createdOrderPartOfQuery =
    _.join(order, ' ');
  return `${query} order by ${createdOrderPartOfQuery}`;
};

module.exports = {
  generateQueryWithFilter,
  generateQueryWithOrder
}
