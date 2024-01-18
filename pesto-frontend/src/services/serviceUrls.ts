const Services = {
  Me: 'user/auth/me',
  Signin: 'user/auth/signin',
  Signup: 'user/auth/signup',
  updateUser: 'user/auth/update',

  createTask: 'task/create',
  fetchUsersTask: 'task/all',
  getTask: 'task/',
  deleteTask: 'task/',
  updateTask: 'task/',
} as const;

export default Services;
