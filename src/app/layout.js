"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import ProtectedRoute from './CommonComponents/protectedRoute';
import { Provider } from "react-redux";
import {store} from "./redux/store/store"
import React from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CSP',
  description: 'CSP visit Application',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
            <ProtectedRoute >{children}</ProtectedRoute>
             
          </Provider>
      </body>
    </html>
  );
}