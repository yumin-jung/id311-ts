import React from 'react';
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Layout from '../components/Layout'
import CssBaseline from "@mui/material/CssBaseline";

function App({ Component, pageProps }:AppProps) {
  return (
    <>
      <style jsx global>{`
                body {
                    background-color: transparent;
                }
                `}</style>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App;