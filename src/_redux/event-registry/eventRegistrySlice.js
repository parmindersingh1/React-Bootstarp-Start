import { createSlice } from "@reduxjs/toolkit";

export const initialEventState = {
  error: null,
  loading: null,
  events: [],
  eventRegistry: null,
  success: null,
};

export const eventRegistrySlice = createSlice({
  name: "events",
  initialState: initialEventState,
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
    eventsFetched: (state, action) => {
      state.loading = false;
      state.events = action.payload.events;
      state.error = null;
    },
    // fetch user
    eventRegistryFetched: (state, action) => {
      state.loading = false;
      state.eventRegistry = action.payload.eventRegistry;
      state.error = null;
    },
    // create user
    eventCreated: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    eventDeleted: (state, action) => {
      state.loading = false;
      state.events = state.events.filter(
        (event) => event.id !== action.payload.eventId
      );
      state.error = null;
    },
    eventUpdated: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state, action) => initialEventState);
  },
});
