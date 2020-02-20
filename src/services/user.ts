import request from '@/utils/request.js';

interface ILoginPayload {
  access_token?: string;
  tel?: string;
  verificationCode?: string;
}

export const queryCurrent = async () => request(`/v1/user_access/current/${'luoxuhai'}`);

export const query = async () => request('/v1/user_access/index');

export const login = async (payload: ILoginPayload) => request('/v1/users/login', { method: 'post', data: payload });

export const queryVerificationCode = async (payload: { tel: string }) =>
  request('/v1/users/verify_code', { method: 'get', params: payload });
