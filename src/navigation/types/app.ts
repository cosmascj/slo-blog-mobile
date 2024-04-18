import { NavigatorScreenParams } from '@react-navigation/native';

export type AppRoutes = {
  TabStack: NavigatorScreenParams<TabRoutes>;
  HomeStack: NavigatorScreenParams<HomeRoutes>;
};
export type HomeRoutes = {
  DashboardHome: undefined;
  BlogDetails: { id: number };
};

export type AuthRoutes = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: { email: string };
  VerifyAccount: { email: string; isPasswordReset: boolean };
};
export type TabRoutes = {
  Home: undefined;
  Category: undefined;
  Profile: undefined;
};
