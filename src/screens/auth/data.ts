interface RegisterErrors {
  email?: string | null;
  password?: string | null;
  name?: string | null;
  password_confirmation?: string | null;
}
interface LoginErrors {
  email?: string | null;
  password?: string | null;
}
interface ForgotPasswordError {
  email?: string | null;
}
interface OTPProps {
  otp: string;
  password: string;
  confirm_password: string;
}
interface OTPErrors {
  otp?: string | null;
  password?: string | null;
  confirm_password?: string | null;
}
interface LoginResponse {
  message: string;
  data: LoginResponseData;
}

interface LoginResponseData {
  token: string;
  name: string;
  email: string;
  'expiration_time (hrs)': number;
  user_type: string;
}
