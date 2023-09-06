"use client";
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CspProvider } from "./context/cspContext";
import ProtectedRoute from './CommonComponents/protectedRoute';
import { Provider } from "react-redux";
import {store} from "./redux/store/store"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CSP',
  description: 'CSP visit Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* <CspProvider> */}
          {/* <ProtectedRoute> */}
          <Provider store={store}>
              {children}
          </Provider>
            
          {/* </ProtectedRoute>           */}
        {/* </CspProvider> */}
      </body>
    </html>
  );
}
