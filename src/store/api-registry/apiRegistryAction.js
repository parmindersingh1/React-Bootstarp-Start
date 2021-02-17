import * as requestFromServer from "./apiRegistryCrud";

import { apiRegistrySlice } from "./apiRegistrySlice";

const { actions } = apiRegistrySlice;

export const fetchConfigs = () => (dispatch) => {
  dispatch(actions.startCall());
  return requestFromServer
    .fetchConfigs()
    .then((response) => {
      console.log("response.data ::", response.data);
      dispatch(actions.apisFetched({ apis: response.data }));
    })
    .catch((err) => {
      console.log("err", err);
      dispatch(actions.catchError({ error: err.message }));
    });
};

// export const getApibyId = (apiId) => (dispatch) => {
 
//     dispatch(actions.startCall());
//     return requestFromServer
//       .getApibyId(apiId)
//       .then((response) => {
//         console.log("response.data ::", response.data);
//         dispatch(
//           actions.apiRegistryFetched({ apiRegistry: response.data })
//         );
       
//       })
//       .catch((err) => {
//         console.log("err", err);
//         dispatch(actions.catchError({ error: err.message }));
       
     
//   });
// };

export const getApibyId = (eventId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(actions.startCall());
    return requestFromServer
      .getApibyId(eventId)
      .then((response) => {
        console.log("response.data ::", response.data);
        dispatch(
          actions.apiRegistryFetched({ apiRegistry: response.data })
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

export const createConfig = (apiData) => (dispatch) => {
  console.log("apiData", apiData);
  return new Promise((resolve, reject) => {
    dispatch(actions.startCall());
    requestFromServer
      .createConfig(apiData)
      .then((response) => {
        console.log("response.data ::", response.data);
        dispatch(actions.apiCreated({ success: true }));
        resolve(response);
      })
      .catch((err) => {
        console.log("err.data", err);
        // dispatch(actions.catchError({ error: err.data.message }));
        reject(err);
      });
  });
};

export const deleteApiData = (apiId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(actions.startCall());
    return requestFromServer
      .deleteApiData(apiId)
      .then((response) => {
        console.log("response.data ::", response.data);
        dispatch(actions.apiDeleted({ apiId }));
        resolve(response);
      })
      .catch((err) => {
        console.log("err.data", err.data);
        dispatch(actions.catchError({ error: err.data.message }));
        reject(err);
      });
  });
};

export const updateConfig = (apiId, apiData) => (dispatch) => {
  console.log("from action", apiId, apiData);

  return new Promise(function (resolve, reject) {
    dispatch(actions.startCall());
    requestFromServer
      .updateConfig(apiId, apiData)
      .then(() => {
        dispatch(
          actions.apiUpdated({ success: "api updated Successfully!" })
        );
        resolve({ success: "api updated updated Successfully!" });
      })
      .catch((error) => {
        console.log("err.data", error.data);
        dispatch(actions.catchError({ error: error.data.message }));
        reject(error);
      });
  });
};

export const searchInputType = (text) => (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(actions.startCall());
      return requestFromServer
        .searchInputType(text)
        .then((response) => {
          console.log("response.data ::", response.data);
          dispatch(
            actions.inputSearch({ inputType: response.data })
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
  
export const getProtoDef = (text) => (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(actions.startCall());
      return requestFromServer
        .getProtoDef(text)
        .then((response) => {
          console.log("response.data ::", response.data);
          dispatch(
            actions.protoSearch({ protoDef: response.data })
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

  


