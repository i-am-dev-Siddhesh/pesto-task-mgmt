import FullScreenLoader from '@/components/Loader/FullScreenLoader';
import { wrapper } from '@/store/index';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks/useAuth';

function App({ Component, pageProps }: AppProps) {
  const { isLoading } = useAuth();

  return isLoading ? (
    <FullScreenLoader />
  ) : (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default wrapper.withRedux(App);
