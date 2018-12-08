import { Api } from '../utils/api';
import { getOptions, getPath } from '../utils/actionsUtil';

export function getActionModel(actionType) {
  return actionType.split('/')[0];
}

export function getActionApi(actionType) {
  return actionType.split('/')[1];
}

export function getActionStatus(actionType) {
  return actionType.split('/')[2];
}

function generateApiActions(model, api) {
  return {
    REQUESTED: `${model}/${api}/REQUESTED`,
    SUCCESS: `${model}/${api}/SUCCESS`,
    FAILED: `${model}/${api}/FAILED`,
  };
}

function generateRestActions(model) {
  return {
    GET: generateApiActions(model, 'GET'),
    LIST: generateApiActions(model, 'LIST'),
    POST: generateApiActions(model, 'POST'),
    PATCH: generateApiActions(model, 'PATCH'),
    PUT: generateApiActions(model, 'PUT'),
  };
}

export const CATEGORIES = {
  MODEL: 'categories',
  ...generateRestActions('categories'),
};

export const MERCHANTS = {
  MODEL: 'merchants',
  ...generateRestActions('merchants'),
};

export const USERS = {
  MODEL: 'users',
  REGISTER: generateApiActions('users', 'REGISTER'),
  LOGIN: generateApiActions('users', 'LOGIN'),
  LOAD_AUTH: generateApiActions('users', 'LOAD_AUTH'),
  ...generateRestActions('users'),
};

export const GALLERIES = {
  MODEL: 'galleries',
  ...generateRestActions('galleries'),
};

export const LISTINGS = {
  MODEL: 'listings',
  ...generateRestActions('listings'),
};

export const MODELS_LIST = [CATEGORIES, USERS, MERCHANTS, GALLERIES, LISTINGS];

export const MODEL_MAP = (() => {
  const m = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const model of MODELS_LIST) {
    m[model.MODEL] = model;
  }
  return m;
})();

export function get({ model, id, query, contentType }) {
  const options = getOptions({ method: 'GET', contentType });
  const path = getPath({ model, id, query });
  return Api(path, options);
}

export function post({ model, id, url, data, contentType }) {
  const options = getOptions({ method: 'POST', data, contentType });
  const path = getPath({ model, id, url });
  return Api(path, options);
}

export function put({ model, id, url, data, contentType }) {
  const options = getOptions({ method: 'PUT', data, contentType });
  const path = getPath({ model, id, url });
  return Api(path, options);
}

export function patch({ model, id, url, data, contentType }) {
  const options = getOptions({ method: 'PATCH', data, contentType });
  const path = getPath({ model, id, url });
  return Api(path, options);
}
