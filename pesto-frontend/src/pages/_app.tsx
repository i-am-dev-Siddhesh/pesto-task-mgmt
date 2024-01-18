import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useAuth } from '../hooks/useAuth'
import FullScreenLoader from '@/components/Loader/FullScreenLoader'
import { wrapper } from '@/store/index';

function App({ Component, pageProps }: AppProps) {
  const { isLoading } = useAuth()
  return isLoading ? <FullScreenLoader /> : <Component {...pageProps} />
}

export default wrapper.withRedux(App)

