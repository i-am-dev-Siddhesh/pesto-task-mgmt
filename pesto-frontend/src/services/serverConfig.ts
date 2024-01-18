import axios, {
  AxiosError,
  AxiosResponse,
  AxiosResponseTransformer,
} from 'axios';
import { getBearerToken } from '../utils/tokenUtils';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL as string,
  timeout: 300000,
  headers: {
    apikey: process.env.NEXT_PUBLIC_SERVER_API_KEY as string,
    Accept: 'application/json',
    'content-type': 'application/json',
    Authorization: 'Bearer ' + getBearerToken(),
  },
  withCredentials: true,
});

const formDataInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL as string,
  timeout: 100000,
  headers: {
    apikey: process.env.NEXT_PUBLIC_SERVER_API_KEY as string,
    Accept: 'application/json',
    'content-type': 'multipart/form-data',
  },
  withCredentials: true,
});

const requestFailureCallback = (url: string, error: AxiosError): any => {
  if (error.response) {
    console.log(
      `Request Failed for ${url}: The request was made and the server responded with erroneous status code`,
      error.response.data
    );
  } else if (error.request) {
    console.log(
      `Request Failed for ${url}: The request was made but no response was received`
    );
  } else {
    console.log(
      `Error due to bad request configuration for ${url}`,
      error.message
    );
  }
  throw error;
};

const get = (
  url: string,
  params?: Record<string, any>,
  transformer?: AxiosResponseTransformer
): Promise<any> => {
  return instance
    .get(url, {
      params,
      transformResponse: transformer,
    })
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => requestFailureCallback(url, error));
};

const post = (
  url: string,
  params?: Record<string, any>,
  data?: Record<string, any>
): Promise<any> => {
  return instance
    .post(url, data, {
      params,
    })
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => requestFailureCallback(url, error));
};

const patch = (
  url: string,
  params?: Record<string, any>,
  data?: Record<string, any>
): Promise<any> => {
  return instance
    .patch(url, data, {
      params,
    })
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => requestFailureCallback(url, error));
};
const postWithServerResponse = (
  url: string,
  params?: Record<string, any>,
  data?: Record<string, any>
): Promise<any> => {
  return instance
    .post(url, data, {
      params,
    })
    .then((response: AxiosResponse) => response)
    .catch((error: AxiosError) => requestFailureCallback(url, error));
};

const put = (
  url: string,
  params?: Record<string, any>,
  data?: Record<string, any>
): Promise<any> => {
  return instance
    .put(url, data, {
      params,
    })
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => requestFailureCallback(url, error));
};

const delet = (
  url: string,
  params?: Record<string, any>,
  data?: Record<string, any>
): Promise<any> => {
  return instance
    .delete(url, {
      params,
      data,
    })
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => requestFailureCallback(url, error));
};

const formDataPost = (
  url: string,
  params?: Record<string, any>,
  data?: Record<string, any>
): Promise<any> => {
  return formDataInstance
    .post(url, data, {
      params,
    })
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => requestFailureCallback(url, error));
};

export { get, post, put, postWithServerResponse, patch, delet, formDataPost };
