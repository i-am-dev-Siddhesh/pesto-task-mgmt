const Services = {
  Me: "auth/user/me",
  Login: "auth/user/login",
  Logout: "auth/user/logout",
  googleLogin:"auth/user/google/login",
  googleRegister:"auth/user/google/register",
  verfiyUserEmail: "auth/user/verify",
} as const;

export default Services;
