const setBearerToken = (token: string, expiration: number): void => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('accessToken', JSON.stringify({ token, expiration }));
  }
};

const getBearerToken = (): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedData = localStorage.getItem('accessToken');
    if (storedData) {
      const { token, expiration } = JSON.parse(storedData);
      if (expiration > Date.now()) {
        return token;
      } else {
        // Token has expired, remove it
        removeBearerToken();
      }
    }
  }
  return null;
};

const removeBearerToken = (): void => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('accessToken');
  }
};

export { setBearerToken, getBearerToken, removeBearerToken };
