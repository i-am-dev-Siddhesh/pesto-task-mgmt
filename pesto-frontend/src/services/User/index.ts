import { post, put, get } from "@/services/serverConfig";
import Services from "../serviceUrls";
import {
  TForgotPasswordProps,
  TRegisterUserProps,
  TResetPasswordProps,
  TUpdateUserProps,
} from "./types";

function getSession(sessionId: string): Promise<{ data: any }> {
  return get(Services.session + "/" + sessionId, {});
}

function registerUser(data: TRegisterUserProps): Promise<string> {
  return post(Services.registerUser, {}, data);
}

function updateUser(data: TUpdateUserProps): Promise<string> {
  return post(Services.updateUser, {}, data);
}

function forgotPassword(data: TForgotPasswordProps): Promise<string> {
  return post(Services.forgotPassword, {}, data);
}

function verfiyUserEmail(data: any): Promise<string> {
  return post(Services.verfiyUserEmail, {}, data);
}

function meApi(headers: any): Promise<any> {
  return get(Services.Me, {});
}

function resetPassword(
  data: TResetPasswordProps,
  params: any
): Promise<string> {
  return put(Services.resetPassword, params || {}, data);
}

function subscription(data: any): Promise<string> {
  return post(Services.subscription, {}, data);
}

function googleLogin(data: { token: string }): Promise<string> {
  return post(Services.googleLogin, {}, data);
}

function googleRegister(data: { token: string }): Promise<string> {
  return post(Services.googleRegister, {}, data);
}

const UserService = {
  registerUser,
  updateUser,
  forgotPassword,
  resetPassword,
  verfiyUserEmail,
  meApi,
  subscription,
  getSession,
  googleLogin,
  googleRegister
};

export default UserService;
