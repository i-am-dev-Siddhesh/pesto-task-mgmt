import { get, postWithServerResponse } from '@/services/serverConfig';
import Services from '../serviceUrls';
import { LoginProps, SignupProps } from './types';

function getLoggedInUser(): Promise<string> {
  return get(Services.Me);
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
  SignupUser
};

export default AuthService;
