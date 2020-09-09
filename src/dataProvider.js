import {fetchUtils} from 'react-admin';
import {stringify} from 'query-string';
import _ from 'lodash';
import {host} from './config';

const transformIncomingData = (data, resource) => {
  if (!data) return;
  if (resource === 'customers') {
    if (_.isArray(data)) {
      return _.map(data, d => ({
        ...d,
        id: d.customer_id
      }));
    }
    return {...data, id: data.customer_id};
  }

  if (resource === 'users') {
    if (_.isArray(data)) {
      return _.map(data, d => ({
        ...d,
        x_data: JSON.stringify(d.x_data, null, 2),
        id: d.user_id
      }));
    }
    return {...data, id: data.user_id, x_data: JSON.stringify(data.x_data, null, 2)};
  }

  if (resource === 'approvals') {
    if (_.isArray(data)) {
      return _.map(data, d => ({
        ...d,
        id: d.approval_id
      }));
    }
    return {...data, id: data.approval_id};
  }

  if (resource === 'credits') {
    if (_.isArray(data)) {
      return _.map(data, d => ({
        ...d,
        id: d.credit_id
      }));
    }
    return {...data, id: data.credit_id};
  }

  return data;
};

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({Accept: 'application/json'});
  }
  const token = localStorage.getItem('token');
  options.headers.set('token', token);
  return fetchUtils.fetchJson(url, options);
}

export default {
  getList: (resource, params) => {
    const {page, perPage} = params.pagination;
    const {field, order} = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${host}/api/${resource}?${stringify(query)}`;

    console.log('getList', resource, params);

    return httpClient(url).then(({headers, json}) => {
      return {
        data: transformIncomingData(json, resource),
        total: parseInt(headers.get('content-range').split('/').pop(), 10),
      }
    });
  },

  getOne: (resource, params) => {
    console.log('getOne', resource, params);
    return httpClient(`${host}/api/${resource}/${params.id}`).then(({json}) => ({
      data: transformIncomingData(json, resource),
    }))
  },

  getMany: (resource, params) => {
    console.log('getMany', resource, params);
    const query = {
      filter: JSON.stringify({id: params.ids}),
    };
    const url = `${host}/api/${resource}?${stringify(query)}`;
    return httpClient(url).then(({json}) => ({data: transformIncomingData(json, resource)}));
  },

  getManyReference: (resource, params) => {
    console.log('getManyReference', resource, params);
    const {page, perPage} = params.pagination;
    const {field, order} = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${host}/api/${resource}?${stringify(query)}`;

    return httpClient(url).then(({headers, json}) => ({
      data: transformIncomingData(json, resource),
      total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
  },

  update: (resource, params) => {
    console.log('update', resource, params);
    return httpClient(`${host}/api/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({json}) => ({data: json}));
  },
  updateMany: (resource, params) => {
    console.log('updateMany', resource, params);
    const query = {
      filter: JSON.stringify({id: params.ids}),
    };
    return httpClient(`${host}/api/${resource}?${stringify(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({json}) => ({data: transformIncomingData(json, resource)}));
  },

  create: (resource, params) => {
    console.log('create', resource, params);
    return httpClient(`${host}/api/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({json}) => ({
      data: transformIncomingData(json, resource)
    }));
  },
  delete: (resource, params) => {
    console.log('delete', resource, params);
    return httpClient(`${host}/api/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({json}) => ({data: json}));
  },
  deleteMany: (resource, params) => {
    console.log('deleteMany', resource, params);
    const query = {
      filter: JSON.stringify({id: params.ids}),
    };
    return httpClient(`${host}/api/${resource}?${stringify(query)}`, {
      method: 'DELETE',
      body: JSON.stringify(params.data),
    }).then(({json}) => ({data: transformIncomingData(json, resource)}));
  },
};
