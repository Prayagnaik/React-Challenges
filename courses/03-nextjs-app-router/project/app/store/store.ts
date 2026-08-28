import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

// Redux Toolkit store
// configureStore: Creates the Redux store.
// reduxStore: Central application state.
// slice: Defines Redux state and reducers.
// apiReducer: RTK Query API reducer is added to the store.
// apiMiddleware: RTK Query middleware handles caching and requests.
//createApi, fetchBaseQuery, useQuery, useMutation
// Provider, useSelector, useDispatch

type CounterState = {
    value: number;
};

const initialState: CounterState = {
    value: 0,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },

        decrement: (state) => {
            state.value -= 1;
        },

        incrementByAmount: (
            state,
            action: PayloadAction<number>
        ) => {
            state.value += action.payload;
        },
    },
});

export const {
    increment,
    decrement,
    incrementByAmount,
} = counterSlice.actions;

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,

        // RTK Query API reducer
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    // RTK Query API middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

// RootState: Type of the complete Redux store state.
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch: Type of the Redux dispatch function.
export type AppDispatch = typeof store.dispatch;