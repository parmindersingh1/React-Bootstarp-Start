import axios from "axios";

export function fetchEventRegistries() {
  return axios.get(`eventRegistry`);
}

export function createEventRegistry(eventData) {
  return axios.post(`eventRegistry`, eventData);
}

export function deleteEventData(eventId) {
  return axios.delete(`eventRegistry/${eventId}`);
}

export function getEventbyId(eventId) {
  return axios.get(`eventRegistry/${eventId}`);
}
export function updateEvent(eventId, eventData) {
  return axios.put(`eventRegistry/${eventId}`, eventData);
}
