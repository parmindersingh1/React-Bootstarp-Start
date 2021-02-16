import * as requestFromServer from "./eventRegistryCrud";

import { eventRegistrySlice } from "./eventRegistrySlice";

const { actions } = eventRegistrySlice;

export const getAllEvents = () => (dispatch) => {
  dispatch(actions.startCall());
  return requestFromServer
    .fetchEventRegistries()
    .then((response) => {
      console.log("response.data ::", response.data);
      dispatch(actions.eventsFetched({ events: response.data }));
    })
    .catch((err) => {
      console.log("err", err);
      dispatch(actions.catchError({ error: err.message }));
    });
};

export const getEventbyId = (eventId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(actions.startCall());
    return requestFromServer
      .getEventbyId(eventId)
      .then((response) => {
        console.log("response.data ::", response.data);
        dispatch(
          actions.eventRegistryFetched({ eventRegistry: response.data })
        );
        resolve(response);
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(actions.catchError({ error: err.message }));
        reject(err);
      });
  });
};

export const createEvent = (eventData) => (dispatch) => {
  console.log("eventData", eventData);
  return new Promise((resolve, reject) => {
    dispatch(actions.startCall());
    requestFromServer
      .createEventRegistry(eventData)
      .then((response) => {
        console.log("response.data ::", response.data);
        dispatch(actions.eventCreated({ success: true }));
        resolve(response);
      })
      .catch((err) => {
        console.log("err.data", err);
        // dispatch(actions.catchError({ error: err.data.message }));
        reject(err);
      });
  });
};

export const deleteEventData = (eventId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(actions.startCall());
    return requestFromServer
      .deleteEventData(eventId)
      .then((response) => {
        console.log("response.data ::", response.data);
        dispatch(actions.eventDeleted({ eventId }));
        resolve(response);
      })
      .catch((err) => {
        console.log("err.data", err.data);
        dispatch(actions.catchError({ error: err.data.message }));
        reject(err);
      });
  });
};

export const updateEvent = (eventId, eventData) => (dispatch) => {
  console.log("from action", eventId, eventData);

  return new Promise(function (resolve, reject) {
    dispatch(actions.startCall());
    requestFromServer
      .updateEvent(eventId, eventData)
      .then(() => {
        dispatch(
          actions.eventUpdated({ success: "evnt updated Successfully!" })
        );
        resolve({ success: "event updated updated Successfully!" });
      })
      .catch((error) => {
        console.log("err.data", error.data);
        dispatch(actions.catchError({ error: error.data.message }));
        reject(error);
      });
  });
};
