import { NavigatorScreenParams } from '@react-navigation/native';

export type AppRoutes = {
  TabStack: NavigatorScreenParams<TabRoutes>;
  HomeStack: NavigatorScreenParams<HomeRoutes>;
};
export type HomeRoutes = {
  DashboardHome: undefined;
};

export type AuthRoutes = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: { email: string };
};
export type TabRoutes = {
  Home: undefined;
  Category: undefined;
  Profile: undefined;
};
