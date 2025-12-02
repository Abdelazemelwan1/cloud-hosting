"use client"

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { ToastContainer } from "react-toastify";

export default function ClientProvider({ children }) {
  return (
    <Provider store={store}>
      <ToastContainer theme="colored" position="top-center" />
      {children}
    </Provider>
  );
}
