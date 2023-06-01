import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Kanit } from 'next/font/google';
import Head from 'next/head';

const kanit = Kanit({
  weight: ["300", "400", "500"],
  subsets: ["latin"]
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <style jsx global>{`
      :root {
        --kanit: ${kanit.style.fontFamily};
      }
    `}</style>
      <Head>
        <title>Games Heaven</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
