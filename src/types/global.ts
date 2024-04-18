export type ApiOptions = Record<string, unknown>;
export interface ApiError {
  success?: boolean;
  errors?: Record<string, string | string[]>;
  error?: string;
  message?: string;
  detail?: string;
}
