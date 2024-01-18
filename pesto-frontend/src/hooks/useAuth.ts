import AuthService from '@/services/Auth';
import { setUser } from '@/store/reducers/user.reducer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router: any = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUserData] = useState(null);
  const [isApiCallPending, setIsApiCallPending] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    // Check if there is an API call pending
    if (isApiCallPending) {
      return;
    }

    // Set the flag to indicate that an API call is in progress
    setIsApiCallPending(true);

    if (user) {
      setIsLoading(false);
      setIsApiCallPending(false);
      return;
    } else {
      AuthService.getLoggedInUser()
        .then((resp: any) => {
          setUserData(resp.data);
          dispatch(setUser({ data: resp.data }));
          if (router.pathname.includes('/profile')) {
            return;
          }
          router.push('/');
        })
        .catch(() => {
          router.push('/signin');
        })
        .finally(() => {
          setIsLoading(false);
          // Reset the flag when the API call is complete
          setIsApiCallPending(false);
        });
    }
  }, [user, isApiCallPending, router, dispatch]);

  return {
    isLoading,
    user,
  };
};
