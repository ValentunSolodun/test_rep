const {Client} = require('pg');
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const app = express();
const {generateQueryWithFilter, generateQueryWithOrder} = require('./helpers');
// const db = require('./tools/db');

const db = new Client({
  host: "localhost",
  user: "postgres",
  password: "12345",
  port: 5433,
  database: "intimmeet_admin"
})

db.connect();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/api/login', async (req, res) => {

  const userObj = {
    login: req.body.login,
    password: req.body.password
  };

  const user = await db.query(`select * from admins where login='${userObj.login}' and active='1' limit 1`);

  if (_.isEmpty(user.rows)) {
    res.sendStatus(500);
    return;
  }

  if (userObj.password === user.rows[0].password) {
    let token = generateToken(user.rows[0].id, user.rows[0].login);
    res.send({token, user: user.rows[0]});
  } else {
    res.sendStatus(403);
  }

});

app.use('/', (req, res, next) => {

  let token = req.headers.token;

  jwt.verify(token, 'secret', (err, data) => {
    if (err) {
      res.sendStatus(401);
    } else {
      // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      // res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      // res.setHeader('Access-Control-Allow-Credentials', true);
      req.user = data;
      next();
    }

  });
});

app.use((req, res, next) => {
  res.append('Access-Control-Expose-Headers', '*');
  next();
});

//Customers

app.get('/api/customers', H(async (req, res) => {
  const parsedFilter = JSON.parse(req.query.filter);
  const parsedRange = JSON.parse(req.query.range);
  const parsedSort = JSON.parse(req.query.sort);
  if (parsedSort[0] === 'id') parsedSort[0] = 'customer_id';

  let query = generateQueryWithFilter('select * from customers', parsedFilter, 'and');
  query = generateQueryWithOrder(query, parsedSort);

  // const countRows = await db.query(generateQueryWithFilter('select count(1) from customers', parsedFilter, 'and'));

  const customers = await db.query(query);
  res.append('Content-Range', customers.length);
  res.send(customers.rows.slice(parsedRange[0], parsedRange[1] + 1));
}));

app.get('/api/customers/:customerId', H(async (req, res) => {
  const customers = await db.query(`select * from customers where customer_id=${req.params.customerId} limit 1`);
  res.send(customers.rows[0]);
}));

app.put('/api/customers/:customerId', H(async (req, res) => {
  const {api_key, api_secret, enabled} = req.body;
  await db.query(`update customers c set 
  api_key='${api_key}',
  api_secret='${api_secret}',
  enabled='${enabled}'
  where c.customer_id=${req.params.customerId};`);

  res.send({});
}));

app.post('/api/customers', H(async (req, res) => {
  const insertData = req.body;
  const insertKeys = Object.keys(insertData);
  const insertValues = Object.values(insertData);
  await db.query(`insert into customers (${insertKeys.join(', ')}) values (${insertValues.map(v => `'${String(v)}'`).join(', ')})`);
  res.send(insertData);
}));

app.delete('/api/customers/:customerId', H(async (req, res) => {
  await db.query(`delete from customers c where c.customer_id = '${req.params.customerId}'`);
  res.send({});
}));

//

//Users

app.get('/api/users', H(async (req, res) => {
  const parsedFilter = JSON.parse(req.query.filter);
  const parsedRange = JSON.parse(req.query.range);
  const parsedSort = JSON.parse(req.query.sort);
  if (parsedSort[0] === 'id') parsedSort[0] = 'user_id';

  let query = generateQueryWithFilter('select * from users', parsedFilter, 'and');
  query = generateQueryWithOrder(query, parsedSort);

  // const countRows = await db.query(generateQueryWithFilter('select count(1) from users', parsedFilter, 'and'));

  const users = await db.query(query);
  res.append('Content-Range', users.rows.length);
  res.send(users.rows.slice(parsedRange[0], parsedRange[1] + 1));
}));

app.get('/api/users/:userId', H(async (req, res) => {
  const user = await db.query(`select * from users u where u.user_id=${req.params.userId} limit 1`);
  res.send(user.rows[0]);
}));

app.put('/api/users/:userId', H(async (req, res) => {
  const {x_data, settings} = req.body;
  await db.query(`update users u set
  x_data='${JSON.stringify(x_data)}',
  settings='${JSON.stringify(settings)}'
  where u.user_id=${req.params.userId};`);
  res.send({});
}));

app.post('/api/users', H(async (req, res) => {
  const insertData = req.body;
  const insertKeys = Object.keys(insertData);
  const insertValues = Object.values(insertData);
  await db.query(`insert into users (${insertKeys.join(', ')}) values (${insertValues.map(v => `'${String(v)}'`).join(', ')})`);
  res.send(insertData);
}));

app.delete('/api/users/:userId', H(async (req, res) => {
  await db.query(`delete from users u where u.user_id = '${req.params.userId}'`);
  res.send({});
}));

//

// Approvals

app.get('/api/approvals', H(async (req, res) => {
  const parsedFilter = JSON.parse(req.query.filter);
  const parsedRange = JSON.parse(req.query.range);
  const parsedSort = JSON.parse(req.query.sort);
  if (parsedSort[0] === 'id') parsedSort[0] = 'approval_id';
  let query = `select * from approvals`;
  if (parsedFilter.customer_id) {
    query = `select 
              a.user_id, 
              a.target_id,
              a.updated_time,
              a.approval_id,
              a.status,
              a.created_time,
              a.approval,
              a.user_approval,
              a.target_approval
              from users u 
              join approvals a on a.user_id=u.user_id`;
  }

  query = generateQueryWithFilter(query, parsedFilter, 'and');
  query = generateQueryWithOrder(query, parsedSort);

  // const countRows = await db.query(generateQueryWithFilter('select count(1) from approvals', parsedFilter, 'and'));

  const approvals = await db.query(query);
  res.append('Content-Range', approvals.rows.length);
  res.send(approvals.rows.slice(parsedRange[0], parsedRange[1] + 1));
}));

app.get('/api/approvals/:approvalId', H(async (req, res) => {
  const approvals = await db.query(`select * from approvals a where a.approval_id=${req.params.approvalId} limit 1`);
  res.send(approvals.rows[0]);
}));

app.put('/api/approvals/:approvalId', H(async (req, res) => {
  const {created_time, updated_time, status, approval, user_approval, target_approval} = req.body;

  await db.query(`update approvals a set 
  created_time='${created_time}',
  updated_time='${updated_time}',
  status='${status}',
  approval='${approval}',
  user_approval='${user_approval}',
  target_approval='${target_approval}'
  where a.approval_id=${req.params.approvalId};`);
  res.send({});
}));

app.post('/api/approvals', H(async (req, res) => {
  const insertData = req.body;
  const insertKeys = Object.keys(insertData);
  const insertValues = Object.values(insertData);
  await db.query(`insert into approvals (${insertKeys.join(', ')}) values (${insertValues.map(v => `'${String(v)}'`).join(', ')})`);
  res.send(insertData);
}));

app.delete('/api/approvals/:approvalId', H(async (req, res) => {
  await db.query(`delete from approvals a where a.approval_id = '${req.params.approvalId}'`);
  res.send({});
}));

//

// Credit

app.get('/api/credits', H(async (req, res) => {
  const parsedFilter = JSON.parse(req.query.filter);
  const parsedRange = JSON.parse(req.query.range);
  const parsedSort = JSON.parse(req.query.sort);
  if (parsedSort[0] === 'id') parsedSort[0] = 'credit_id';

  let query = generateQueryWithFilter(`select * from credits`, parsedFilter, 'and');
  query = generateQueryWithOrder(query, parsedSort);

  // const countRows = await db.query(generateQueryWithFilter('select count(1) from credits', parsedFilter, 'and'));

  const credits = await db.query(query);
  res.append('Content-Range', credits.rows.length);
  res.send(credits.rows.slice(parsedRange[0], parsedRange[1] + 1));
}));

app.get('/api/credits/:creditId', H(async (req, res) => {
  const credits = await db.query(`select * from credits c where c.credit_id=${req.params.creditId} limit 1`);
  res.send(credits.rows[0]);
}));

app.put('/api/credits/:creditId', H(async (req, res) => {
  const {amount, created_time, reason, duration} = req.body;

  await db.query(`update credits c set 
  created_time='${created_time}',
  amount='${amount}',
  reason='${reason}',
  duration='${duration}'
  where c.credit_id=${req.params.creditId};`);
  res.send({});
}));

app.post('/api/credits', H(async (req, res) => {
  const insertData = req.body;
  const insertKeys = Object.keys(insertData);
  const insertValues = Object.values(insertData);
  await db.query(`insert into credits (${insertKeys.join(', ')}) values (${insertValues.map(v => `'${String(v)}'`).join(', ')})`);
  res.send(insertData);
}));

app.delete('/api/credits/:creditId', H(async (req, res) => {
  await db.query(`delete from credits c where c.credit_id = '${req.params.creditId}'`);
  res.send({});
}));

//

app.use((err, req, res, next) => {
  if (err) {
    console.log('ERR:', err)
    return res.status(500).send({message: err.message});
  }
  next();
})

app.listen(3001, () => console.log('server listening on 3001'));

function generateToken(id, login) {
  let u = {
    id,
    login,
  };
  return jwt.sign(u, 'secret', {
    expiresIn: 60 * 60 * 24
  });
}

function H(handler) {
  return (req, res, next) => {
    try {
      Promise.resolve(handler(req, res, next)).catch(next)
    } catch (err) {
      next(err);
    }
  }
}
