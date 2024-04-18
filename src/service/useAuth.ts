import { ApiOptions } from '@/types/global';
import api from '@/utils/api';
import { useMutation } from '@tanstack/react-query';

export const useRegister = (options: ApiOptions) =>
  useMutation(async (data: RegisterProp) => await api.post('register', data), {
    ...options,
  });

export const useLogin = (options: ApiOptions) =>
  useMutation(async (data: LoginProp) => await api.post('login', data), { ...options });

export const useVerifyAccount = (options: ApiOptions) =>
  useMutation(async (data: VerifyAccountProp) => await api.post('verify', data), {
    ...options,
  });

export const useInitatePasswordRecovery = (options: ApiOptions) =>
  useMutation(
    async (data: Pick<VerifyAccountProp, 'email'>) =>
      await api.post('resetpassword', data),
    {
      ...options,
    },
  );

export const useResetPassword = (options: ApiOptions) =>
  useMutation(async (data: ResetPasswordProps) => await api.post('resetpassword', data), {
    ...options,
  });
