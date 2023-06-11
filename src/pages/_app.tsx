import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'
import { Kanit } from 'next/font/google';
import Head from 'next/head';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import "nprogress/nprogress";

const kanit = Kanit({
  weight: ["300", "400", "500"],
  subsets: ["latin"]
});

export default function App({ 
  Component, 
  pageProps: {
    session, ...pageProps
  } 
}: AppProps) {

  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });

  Router.events.on('routeChangeError', () => {
    NProgress.done();
  });

  return (
    <>
    <SessionProvider session={session}>
      <style jsx global>{`
        :root {
          --kanit: ${kanit.style.fontFamily};
        }
      `}</style>
        <Head>
          <title>Games Heaven</title>
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </>
    
  )
}
