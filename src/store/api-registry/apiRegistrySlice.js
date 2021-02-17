import { createSlice } from "@reduxjs/toolkit";

export const initialApiState = {
  error: null,
  loading: null,
  apis: [],
  inputType:[],
  apiRegistry: null,
  protoDef:{},
  success: null,
};

export const apiRegistrySlice = createSlice({
  name: "apis",
  initialState: initialApiState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.payload.error}`;
      state.loading = false;
    },
    catchSuccessMessage: (state, action) => {
      state.success = `${action.payload.success}`;
      state.loading = false;
    },
    startCall: (state) => {
      state.error = null;
      state.loading = true;
    },
    // fetch users
    apisFetched: (state, action) => {
      state.loading = false;
      state.apis = action.payload.apis;
      state.error = null;
    },
    // fetch user
    apiRegistryFetched: (state, action) => {
      state.loading = false;
      state.apiRegistry = action.payload.apiRegistry;
      state.error = null;
    },
    // create user
    apiCreated: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    apiDeleted: (state, action) => {
      state.loading = false;
      state.apis = state.apis.filter(
        (api) => api.id !== action.payload.apiId
      );
      state.error = null;
    },
    apiUpdated: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.error = null;
      },
      inputSearch: (state, action) => {
        state.loading = false;
        state.inputType = action.payload.inputType;
        state.error = null;
      },
      protoSearch: (state, action) => {
        state.loading = false;
        state.protoDef = action.payload.protoDef;
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state, action) => initialApiState);
  },
});
