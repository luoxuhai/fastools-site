import request from '@/utils/request.js';
import { ILoginPayload, IQueryVipExpires } from './data';

export const queryUser = async () => request('/v1/users/base');

export const queryUserSpace = async () => request('/v1/users/all');

export const queryVipExpires = async (params?: IQueryVipExpires) => request('/v1/users/vip_expires', { method: 'get', params });

export const login = async (data: ILoginPayload) => request('/v1/users/login', { method: 'post', data });

export const queryVerificationCode = async (params: { tel?: string, email?: string }) => request('/v1/users/verify_code', { method: 'get', params });

export const refreshToken = async () => request('/v1/users/token', { method: 'put' });
