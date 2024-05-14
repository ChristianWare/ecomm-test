"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";

interface GlobalProviderProps {
  children: React.ReactNode
}

export function Globalprovider({ children }: GlobalProviderProps) {
  return (
    <>
      <Toaster />
      <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </Provider>
    </>
  );
}
