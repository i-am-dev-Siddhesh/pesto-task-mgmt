export type TRegisterUserProps = {
  first_name: String;
  last_name: String;
  email: String;
  password: String;
};

export type TUpdateUserProps = {
  first_name?: String;
  last_name?: String;
  phone_number?: String;
  email?: String;
  image?: File;
  address1?: String;
  address2?: String;
  country?: String;
  state?: String;
  postal_code?: String;
  tax_id?: String;
};

export type TForgotPasswordProps = {
  email: String;
};

export type TResetPasswordProps = {
  password: String;
  passwordConfirmation: String;
};
