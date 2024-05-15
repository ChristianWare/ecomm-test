"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

interface GlobalProviderProps {
  children: React.ReactNode
}

export function Globalprovider({ children }: GlobalProviderProps) {
  return (
    <>
      <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </Provider>
    </>
  );
}
