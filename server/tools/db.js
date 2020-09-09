const _ = require('lodash');
const pg = require('pg');
const config = {
  db: {
    host: "localhost",
    user: "postgres",
    password: "12345",
    port: 5433,
    database: "intimmeet_admin",
    max: 10, // set pool max size to 20
  }
};
const pool = new pg.Pool(config.db);
const dataPools = {};
const formatSql = console.log;

pg.types.setTypeParser(20, Number); // bigint as Number
pg.types.setTypeParser(21, Number);
pg.types.setTypeParser(23, Number);
pg.types.setTypeParser(790, Number);
pg.types.setTypeParser(1700, Number);

function _await(func, ...args) {
  const self = this;
  return new Promise((resolve, reject) => {
    args.push((err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
    func.apply(self, args);
  })
}

function ORMClient(connection, anotherPool) {
  this.connection = connection;
  this.pool = anotherPool || pool;
}

ORMClient.prototype.history = function (year) {
  const client = new ORMClient(this.connection);
  const originalQuery = this.query;
  const originalSingle = this.single;
  const initializer = new Promise((resolve, reject) => {
    originalQuery.call(client, 'select * from db_data_info where EXTRACT(YEAR FROM year_db)=$1', [String(year)], (err, res) => {
      if (err || _.isEmpty(res)) return reject(err || Error('ORMClient.data empty'));
      const connectionData = res[0];
      const connectionKey = `${connectionData.db_name}:${connectionData.name_host}:${connectionData.port_host}`;
      if (!dataPools[connectionKey]) {
        dataPools[connectionKey] = new pg.Pool(_.extend({}, config.db, {
          host: connectionData.name_host,
          port: connectionData.port_host,
          database: connectionData.db_name
        }));
      }
      if (connectionData.schema_name) {
        dataPools[connectionKey].on('connect', (client) => {
          client.query(`SET search_path TO '${connectionData.schema_name}'`)
        })
      }

      client.connection = dataPools[connectionKey];
      client.pool = dataPools[connectionKey];
      resolve();
    })
  });
  client.query = (query, params, callback) => initializer
    .then(() => originalQuery.call(client, query, params, callback))
    .catch(callback);
  client.single = (handler) => initializer.then(() => originalSingle.call(client, handler));
  return client
};

ORMClient.prototype.single = function (handler) {
  return new Promise((resolve, reject) => {
    this.pool.connect((err, connection, release) => {
      if (err) return reject(err);
      resolve(Promise.resolve(handler(new ORMClient(connection, this.pool)))
        .catch(e => {
          console.error('ORMClient.single', e)
          release()
          throw e
        })
        .then(r => {
          release()
          return r;
        }))
    })
  })
}

ORMClient.prototype.query = function (query, params, callback) {
  const newParams = [];
  const newQuery = query.replace(/\$(\d+)/g, (__, v) => {
    if (_.isArray(params[v - 1])) {
      if (_.isNumber(params[v - 1][0])) {
        return params[v - 1].join(',')
      }
      return _.map(params[v - 1], (v, i) => {
        newParams.push(v);
        return '$' + newParams.length;
      }).join(',')
    }
    newParams.push(params[v - 1]);
    return '$' + newParams.length;
  });
  this.connection.query(newQuery, newParams, (err, res, info) => {
    info = res;
    res = res && res.rows;
    // end(err, res, info);
    _.isFunction(callback) && callback(err, res);
  });
};

ORMClient.prototype.findAll = function _findAll(table, whereObj, limit, returningKeys, callback) {
  if (typeof returningKeys === 'function') callback = returningKeys;
  if (_.isArray(limit) && !_.isEmpty(limit)) returningKeys = limit;
  if (!_.isArray(returningKeys) || _.isEmpty(returningKeys)) returningKeys = ['*'];
  if (typeof limit === 'function') callback = limit;
  if (typeof limit !== 'number' || Number.isNaN(limit)) limit = 0;
  if (typeof callback !== 'function') callback = function () {
  };
  if (typeof table !== 'string' || !_.isObject(whereObj)) return setImmediate(callback.bind(null, Error('Invalid arguments')));
  this.query(buildFindAll(table, whereObj, returningKeys) + (limit ? ' LIMIT ' + limit : ''), buildWhereValues(whereObj), function (err, res) {
    callback(err, res && res.length > 0 && res || null);
  });
};

ORMClient.prototype.findOne = function _findOne(table, whereObj, returningKeys, callback) {
  if (typeof returningKeys === 'function') callback = returningKeys;
  if (!_.isArray(returningKeys) || _.isEmpty(returningKeys)) returningKeys = ['*'];
  if (typeof callback !== 'function') callback = function () {
  };
  this.findAll(table, whereObj, 1, returningKeys, function (err, res) {
    callback(err, res && res[0] || null);
  });
};

ORMClient.prototype.awaitFindAll = function _awaitFindAll(table, whereObj, limit, returningKeys) {
  return _await.call(this, this.findAll, table, whereObj, limit, returningKeys);
};

ORMClient.prototype.awaitFindOne = function _awaitFindOne(table, whereObj, returningKeys) {
  return _await.call(this, this.findOne, table, whereObj, returningKeys);
};

ORMClient.prototype.awaitSafe = async function _awaitSafe(sql, args) {
  try {
    const res = await _await.call(this, this.query, sql, args || []);
    return res && res.length > 0 && res || null;
  } catch (err) {
    console.error(err, sql, args);
  }
};

ORMClient.prototype.awaitSQL = function _awaitSQL(splitten, ...args) {
  return this.awaitSafe(_.reduce(splitten.slice(1), (result, part, i) => result + `$${i + 1} ${part}`, splitten[0]), args);
};

ORMClient.prototype.awaitRowsSafe = async function _awaitRowsSafe(sql, args) {
  var res = await this.awaitSafe(sql, args);
  if (res && res.length > 0) {
    return res;
  }
  return null;
};

ORMClient.prototype.awaitOneSafe = async function _awaitOneSafe(sql, args) {
  sql = sql.trim();
  if ((/^select/i).test(sql)) sql = sql.replace(/ limit\s+\d+/i, '').replace(/;/g, '') + ' LIMIT 1';
  var res = await this.awaitRowsSafe(sql, args);
  return res && res[0] || null;
};

ORMClient.prototype.awaitUpsertSafe = async function _awaitUpsertSafe(table, obj, whereObj, returningKeys) {
  if (!(
    typeof table === 'string' &&
    isObject(obj) &&
    (!whereObj || isObject(whereObj)) &&
    (!returningKeys || _.isArray(returningKeys)))) {
    throw Error('Invalid arguments');
  }

  let sql;
  let result;

  obj = cleanObject(obj);

  let single = (h) => h(this);
  if (this.connection instanceof this.pool.constructor) {
    single = (h) => this.single(h);
  }

  return single(async (db) => {
    if (_.isObject(whereObj)) {
      sql = buildUpdate(table, _.keys(obj), whereObj, returningKeys || ['*']);
      result = await db.awaitSafe(sql, _.values(obj).concat(buildWhereValues(whereObj)));
    }
    if (_.isEmpty(result)) {
      sql = buildInsertIfNot(table, _.keys(obj), whereObj, returningKeys || ['*']);
      result = await db.awaitSafe(sql, _.values(obj).concat(buildWhereValues(whereObj)));
    }

    if (_.isEmpty(result)) return null;
    if (returningKeys) return result;
    return {
      affectedRows: result.length,
      insertId: _.last(result).id
    };
  });
};

ORMClient.prototype.awaitInsertSafe = async function _awaitInsertSafe(table, array) {
  if (!(
    typeof table === 'string' &&
    _.isArray(array))) {
    throw Error('Invalid arguments');
  }

  if (_.isEmpty(array)) return;

  let sql;

  let single = (h) => h(this);
  if (this.connection instanceof this.pool.constructor) {
    single = (h) => this.single(h);
  }

  return single(async (db) => {
    let keys = {};
    const values = [];

    _.each(array, (obj) => {
      obj = cleanObject(obj);
      _.each(_.keys(obj), (k) => {
        keys[k] = 1;
      });
    });

    keys = _.keys(keys);

    _.each(array, (obj) => {
      _.each(keys, (k) => {
        values.push(obj[k]);
      })
    });

    sql = buildInsertArray(table, keys, array.length);
    await db.awaitSafe(sql, values);
  });
};

ORMClient.prototype.awaitUpdateSafe = function _awaitUpdateSafe(table, obj, whereObj, returningKeys) {
  if (!(
    typeof table === 'string' &&
    isObject(obj) &&
    (!whereObj || isObject(whereObj)) &&
    (!returningKeys || _.isArray(returningKeys)))) {
    throw Error('Invalid arguments');
  }

  var sql;
  var executor = returningKeys ? this.awaitOneSafe.bind(this) : this.awaitSafe.bind(this);
  obj = cleanObject(obj);
  sql = buildUpdate(table, _.keys(obj), whereObj, returningKeys || ['*']);
  const res = executor(sql, _.values(obj).concat(buildWhereValues(whereObj)));
  return !_.isEmpty(returningKeys) ? {affectedRows: _.size(res)} : res;
};

ORMClient.prototype.awaitDeleteSafe = function _awaitDeleteSafe(table, whereObj) {
  if (!(
    typeof table === 'string' && isObject(whereObj))) {
    throw Error('Invalid arguments');
  }

  var sql;
  sql = buildDelete(table, whereObj);
  return this.awaitSafe(sql, buildWhereValues(whereObj));
};

ORMClient.prototype.closeConnection = function _closeConnection(callback) {
  // connection.end(callback)
  callback();
}


ORMClient.prototype.formatSql = function formatSql(sql, args) {
  function toString(v) {
    if (_.isDate(v)) {
      const moment = require('moment');
      return `'${moment(v).format('YYYY-MM-DD HH:mm:ss')}'`;
    }
    if (_.isString(v)) return `'${v}'`;
    if (_.isNumber(v)) return `${Number(v)}`;
    if (_.isArray(v)) return _.map(v, toString).join(',');
    return 'NULL';
  }

  _.each(args, (v, i) => {
    sql = sql.replace(new RegExp('\\$' + (i + 1), 'g'), toString(v));
  });

  return sql;
};

_.each(ORMClient.prototype, (f, k) => {
  if (!/^await/.test(k)) return;
  ORMClient.prototype['_' + k] = f;
  ORMClient.prototype[k] = async function (...args) {
    try {
      return await this['_' + k](...args);
    } catch (err) {
      console.log('DB', k, err.message);
      if (f === this._awaitSafe) {
        console.log(formatSql(args[0], args[1]))
      }
      debugger;
      throw err;
    }
  }
})

module.exports = new ORMClient(pool);
module.exports.ORMClient = ORMClient;

// ORMClient.prototype._query = ORMClient.prototype.query;
// ORMClient.prototype.query = function(){
//   var args = [].slice.call(arguments);
//   var self = this;
//   setTimeout(function(){
//     console.log('DB Query>>>>', args[0], args[1]);
//     ORMClient.prototype._query.apply(self, args);
//   }, 1);
// }

function buildFindAll(table, whereObject, returningKeys) {
  var sql = 'SELECT ' + returningKeys.join(',') + ' FROM ' + table + buildWhere(whereObject)
  return sql;
}

function buildInsertIfNot(table, keys, whereObject, returningKeys) {
  var sql = 'INSERT INTO ' + table + '(' + keys.join(',') + ') SELECT ';
  sql += _.map(_.range(1, keys.length + 1), function (i) {
    return '$' + i;
  }).join(', ');
  if (!_.isEmpty(whereObject)) {
    sql += ' WHERE NOT EXISTS (';
    sql += ' SELECT * FROM ' + table;
    sql += buildWhere(whereObject, keys.length);
    sql += ')';
  }
  if (!_.isEmpty(returningKeys)) sql += ' RETURNING ' + returningKeys.join(',');
  return sql;
}

function buildInsert(table, keys) {
  var sql = 'INSERT INTO ' + table + '(' + keys.join(',') + ') SELECT ';
  sql += _.map(_.range(1, keys.length + 1), function (i) {
    return '$' + i;
  }).join(', ');
  return sql;
}

function buildInsertArray(table, keys, rowsCount) {
  var sql = 'INSERT INTO ' + table + '(' + keys.join(',') + ') VALUES ';
  let values = []
  let counter = 1;
  while (counter < rowsCount * keys.length) {
    values.push('(' + _.map(_.range(0, keys.length), function (i) {
      return '$' + counter++;
    }).join(',') + ')');
  }

  sql += values.join(',');
  return sql;
}

function buildUpdate(table, keys, whereObject, returningKeys) {
  var sql = 'UPDATE ' + table + ' SET ';
  sql += _.map(keys, function (k, i) {
    return k + '=$' + (i + 1);
  }).join(',');
  sql += buildWhere(whereObject, keys.length);
  if (returningKeys) sql += ' RETURNING ' + returningKeys.join(',');
  return sql;
}

function buildDelete(table, whereObject) {
  var sql = "DELETE FROM " + table + buildWhere(whereObject);
  return sql;
}

function buildWhere(whereObject, offset) {
  offset = offset || 0;
  var iterator = offset;

  function join(obj, joiner) {
    if (_.isEmpty(obj)) return joiner === ' or ' ? ' false ' : ' true ';
    if (_.isArray(obj)) {
      return _.chain(obj)
        .filter(function (i) {
          return _.isObject(i);
        })
        .map(function (o) {
          return '(' + join(o, ' AND ') + ')';
        }).value().join(joiner);
    }
    return _.map(obj, function (v, k, i) {
      iterator++;
      if (REGS.or.test(k) || REGS.and.test(k)) {
        iterator--;
        return '(' + join(v, k.replace(REGS.any, ' $1 ')) + ')';
      }
      if (REGS.sql.test(k)) {
        iterator--;
        return '(' + v + ')';
      }
      return getKeyOperator(k, iterator, v);
    }).join(joiner);
  }

  return ' WHERE ' + join(whereObject, ' AND ');
}

function buildWhereValues(whereObject) {
  var res = [];

  function join(obj) {
    if (_.isArray(obj)) {
      return _.each(_.filter(obj, (i) => isObject(i)), join)
    }
    _.each(obj, function (v, k, i) {
      if (REGS.or.test(k) || REGS.and.test(k)) {
        return join(v);
      }
      if (REGS.sql.test(k)) return;
      res.push(v);
    });
  }

  join(whereObject);
  return res;
}

function getKeyOperator(key, iterator, val) {
  key = (key || '_').toLowerCase();
  var parsedKey = '', parsedKeyMatch;

  parsedKeyMatch = key.match(REGS.key);
  if (parsedKeyMatch) parsedKey = parsedKeyMatch[0];
  parsedKeyMatch = parsedKey.match(REGS.tableKey);
  if (parsedKeyMatch) parsedKey = parsedKeyMatch[1] + '.' + parsedKeyMatch[2];

  var operator = key.match(REGS.operator);
  if (operator) operator = operator[1];
  else operator = '=';

  if (operator === '=' && val === 'NULL') return `${parsedKey} isnull`;
  if ((operator === '<>' || operator === '!=') && val === 'NULL') `${parsedKey} notnull`

  if (operator === '=' && _.isArray(val) && !_.isEmpty(val)) return parsedKey + ' in ($' + iterator + ')';
  if (operator === '=' && val instanceof RegExp) {
    const args = [
      parsedKey,
      val.ignoreCase && '~*' || '~',
      val.toString().replace(/\/(.+)\/.?/, '$1')
    ];
    return `${args[0]}${args[1]}'${args[2]}'`;
  }
  return `${parsedKey} ${operator} $${iterator}`;
}

function isObject(o) {
  return _.isObject(o) && !(_.isFunction(o) || _.isArray(o));
}

function cleanObject(o) {
  var result = {};
  _.each(o, function (v, k) {
    if (_.isUndefined(v)) return;
    result[k] = v;
  })
  return result;
}

var REGS = {
  or: /\$or/,
  and: /\$and/,
  sql: /\$sql/,
  any: /.*\$(or|and).*/,
  key: /[a-z0-9_\$\.]+/,
  json: /([a-z0-9_\.]+)\$([a-z0-9_]+)/,
  tableKey: /([a-z0-9_]+)__(.+)/,
  operator: /\s(<>|!=|>=|<=|>|<|=|like|is|in)/
};
