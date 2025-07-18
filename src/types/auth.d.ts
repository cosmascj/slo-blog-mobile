interface AuthState {
  user: LoginResponseData | null;
  token: string | null;
  onboarded: boolean;
  loading: boolean;
  userType: string | null;
}

type UserTokenType = {
  type: string;
  email: string;
  firstName: string;
  lastName: string;
  sub: string;
  iat: number;
  exp: number;
} | null;

type AuthAction =
  | { type: 'SET_USER'; payload: LoginResponseData }
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'SET_ONBOARDED'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGOUT' };

interface AuthContextType extends AuthState {
  logout: () => void;
  setIsOnboarded: () => void;
  setToken: (userToken: LoginResponse) => void;
  setUser: (userData: LoginResponseData) => void;
  //   setUserType: (value: UserType) => void;
}

interface RegisterProp {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  user_type: string;
}

interface LoginProp {
  email: string;
  password: string;
  device_name: string;
}
interface VerifyAccountProp {
  email: string;
  token: string;
}
interface ResetPasswordProp {
  email: string;
  source: string;
}

interface ResetPasswordProps {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}
