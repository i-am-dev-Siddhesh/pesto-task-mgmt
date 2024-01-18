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

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      setIsLoading(false);
      return;
    } else {
      AuthService.getLoggedInUser()
        .then((resp: any) => {
          setUserData(resp.data);
          dispatch(setUser({ data: resp.data }));          
          if (router.pathname.includes('/profile')) {
           return
          }
          router.push('/');
        })
        .catch(() => {
          router.push('/signin');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return {
    isLoading,
    user,
  };
};
