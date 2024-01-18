const Services = {
  Me: 'user/auth/me',
  Signin: 'user/auth/signin',
  Signup: 'user/auth/signup',

  createTask: 'task/create',
  fetchUsersTask: 'task/all',
  getTask: 'task/',
  deleteTask: 'task/',
  updateTask: 'task/',
} as const;

export default Services;
