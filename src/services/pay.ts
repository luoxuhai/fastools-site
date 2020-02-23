import request from '@/utils/request.js';

export const queryPayCode = async (days: number) => request('/v1/pay/native', { method: 'post', data: { days } });

export const queryPayInfo = async (order: string) => request('/v1/pay/info', { method: 'get', params: { order } });
