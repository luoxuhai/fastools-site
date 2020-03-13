import request from '@/utils/request.js';

interface ILoginPayload {
  access_token?: string;
  tel?: string;
  verificationCode?: string;
}

export interface IQueryVipExpires {
  order?: string;
  toolId?: string;
}

export const queryCurrent = async () => request(`/v1/user_access/current/${'luoxuhai'}`);

export const queryUser = async () => request('/v1/users/base');

export const queryUserSpace = async () => request('/v1/users/all');

export const queryVipExpires = async (params?: IQueryVipExpires) => request('/v1/users/vip_expires', { method: 'get', params });

export const login = async (payload: ILoginPayload) => request('/v1/users/login', { method: 'post', data: payload });

export const queryVerificationCode = async (payload: { tel: string }) =>
  request('/v1/users/verify_code', { method: 'get', params: payload });

export const refreshToken = async () => request('/v1/users/token', { method: 'put' });
