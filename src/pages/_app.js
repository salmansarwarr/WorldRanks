import { useState } from 'react'
import '../styles/globals.css'
import Router from 'next/router'
import Loading from "../Components/Loading"


function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', () => {
    setLoading(true);
  })
  Router.events.on('routeChangeComplete', () => {
    setLoading(false)
  })

  return loading ? <Loading/> : <Component {...pageProps} />
}

export default MyApp
