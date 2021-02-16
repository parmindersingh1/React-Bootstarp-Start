import axios from 'axios';
import { env } from '../../../../env';

export function fetchConfigs() {
  return axios.get(`apiRegistry`);
}

export function createConfig(configData) {
  return axios.post(`apiRegistry`, configData);
}
export function updateConfig(id, configData) {
  return axios.put(`apiRegistry/${id}`, configData);
}

export function deleteApiData(apiId) {
  return axios.delete(`apiRegistry/${apiId}`);
}
export function getApibyId(apiId) {
  return axios.get(`apiRegistry/${apiId}`);
}
export function searchInputType(text) {
  return axios.get(`/eventRegistry/eventName/${text}`);
}

export function getProtoDef(text) {
  return axios.get(`/eventRegistry/eventDefinition/${text}`);
}

export function searchApiByName(text) {
  return axios.get(`/apiRegistry/searchByApiName`, {
    params: {
      apiName: text
    }
  });
}

export function checkIfApiExists(apiName, version, id) {
  return axios.get(`/apiRegistry/apiAndVersionCheck`, {
    params: {
      apiName,
      version,
      id: id || ""
    }
  });
}