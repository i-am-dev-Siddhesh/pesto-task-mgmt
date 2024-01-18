import { formDataPut, get, postWithServerResponse, put } from '@/services/serverConfig';
import Services from '../serviceUrls';
import { LoginProps, SignupProps } from './types';

function getLoggedInUser(): Promise<string> {
  return get(Services.Me);
}

function updateUser(data: any): Promise<any> {
  return put(Services.updateUser, {}, data);
}

function updateUserProfile(data: any): Promise<any> {
  return formDataPut(Services.updateUser, {}, data);
}


function SigninUser(data: LoginProps): Promise<any> {
  return postWithServerResponse(Services.Signin, {}, data);
}


function SignupUser(data: SignupProps): Promise<any> {
  return postWithServerResponse(Services.Signup, {}, data);
}

const AuthService = {
  getLoggedInUser,
  SigninUser,
  SignupUser,
  updateUser,
  updateUserProfile
};

export default AuthService;
