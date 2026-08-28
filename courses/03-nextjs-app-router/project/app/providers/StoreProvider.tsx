"use client";

import { Provider } from "react-redux";
import type { ReactNode } from "react";

import { store } from "../store/store";

// Client Component
// useClient: Redux Provider runs on the client.
// StoreProvider: Provides Redux store to the application.
// Provider: Makes the Redux store available to Client Components.
// reduxProvider: Wraps the application with Redux Provider.
// configureStore, useSelector, useDispatch

type StoreProviderProps = {
    children: ReactNode;
};

export default function StoreProvider({
    children,
}: StoreProviderProps) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}