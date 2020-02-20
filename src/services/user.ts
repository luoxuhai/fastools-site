import request from '@/utils/request.js';

export const queryCurrent = async () => request(`/v1/user_access/current/${'luoxuhai'}`);

export const query = async () => request('/v1/user_access/index');

export const login = async (payload: any) => request('/v1/user/login', { method: 'post', data: payload });
